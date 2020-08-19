// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent'
// import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

const SCHOOL_LIST_URL = 'https://api.eol.cn/gkcx/api'

const YEAR_LIST = [2019, 2018]

// 学校基础信息
interface SchoolInfo {
  name: string;
  city_id: number;
  code_enroll: number;
  county_id: number;
  dual_class: number;
  nature: number;
  province_id: number;
  school_id: number;
  rank: number;
  [propName: string]: any;
}
// 学校数据文件
interface SchoolFile {
  data: SchoolInfo[]
}

// 专业分数线
interface ProfessionalScore {
  min: string | number;
  min_section: string | number;
  spname: string;
  [propName: string]: any;
}

class Crowller {
  private pageSize = 20;
  private page = 1;
  private total: number = 0;
  private schoolList: SchoolInfo[] = [];

  private scorePageSize = 10;
  constructor(){
    // 先获取学校  如果获取过了不在获取
    let schoolListPath = path.join(__dirname, `../data/schoolList.json`)
    if (fs.existsSync(schoolListPath)) {
      this.getSchoolProfessionalScore()
    } else {
      this.getSchoolList()
    }
  }

  // 获取浙江本科院校列表
  async getSchoolList() {
    console.log(`----开始获取第${this.page}页学校列表----`)
    const res = await superagent
      .get(SCHOOL_LIST_URL)
      .query({ 
        "access_token": "", 
        "admissions": "", 
        "central": "", 
        "department": "", 
        "dual_class": "", 
        "f211": "", 
        "f985": "", 
        "is_dual_class": "", 
        "keyword": "", 
        "page": this.page, 
        "province_id": 33, 
        "request_type": 1, 
        "school_type": 6000, 
        "size": this.pageSize, 
        "sort": "view_total", 
        "type": "", 
        "uri": "apidata/api/gk/school/lists" 
      })
      console.log(`----获取第${this.page}页学校列表结束----`)

    let resJson = JSON.parse(res.text)
    if(resJson.code === '0000') {
      this.total = resJson.data.numFound
      this.schoolList = this.schoolList.concat(resJson.data.item)
      this.page ++
      if(this.page <= Math.ceil(this.total / this.pageSize)) {
        this.getSchoolList()
      } else {
        let schoolFilePath = path.join(__dirname, '../data/schoolList.json')
        let schoolFile: SchoolFile = {data: this.schoolList}
        fs.writeFileSync(schoolFilePath, JSON.stringify(schoolFile))
        console.log('数据写入完成')

        // 在获取分数线
        this.getSchoolProfessionalScore()
      }
    }
  }

  // 获取学校专业分数线接口地址
  getSchoolProfessionalScoreUrl(year: number, schoolId: number, page: number): string {
    return `https://static-data.eol.cn/www/2.0/schoolspecialindex/${year}/${schoolId}/33/3/${page}.json`
  }

  // 获取分数线
  async getSchoolProfessionalScore() {
    let schoolFilePath = path.join(__dirname, '../data/schoolList.json')
    let fileStr = fs.readFileSync(schoolFilePath, 'utf-8')
    let schoolFile: SchoolFile = JSON.parse(fileStr)
    this.schoolList = schoolFile.data

    for(let school of this.schoolList) {
      await this.getYearData(school)
    }
  }

  // 获取每年数据
  async getYearData(school: SchoolInfo){
    for(let year of YEAR_LIST) {
      let scoreFilePath = path.join(__dirname, `../data/${school.name}/scoreList-${year}.json`)
      if (!fs.existsSync(scoreFilePath)) {
        let scoreList: ProfessionalScore[] = []
        await this.getScoreData(school, year, scoreList, 1, 0)
      }
    }
  }

  // 获取分数线数据
  async getScoreData(school: SchoolInfo, year: number, scoreList: ProfessionalScore[], page: number, total: number) {
    let url = this.getSchoolProfessionalScoreUrl(year, school.school_id, page)
    
    console.log(`----开始获取${year}年${school.name}第${page}页专业分数线列表----`)
    try{
      const res = await superagent.get(url)
      console.log(`----获取${year}年${school.name}第${page}页专业分数线列表结束----`)

      let resJson = JSON.parse(res.text)
      if(resJson.code === '0000') {
        total = resJson.data.numFound
        scoreList = scoreList.concat(resJson.data.item)
        page ++
        if(page <= Math.ceil(total / this.scorePageSize)) {
          await this.getScoreData(school, year, scoreList, page, total)
        } else {
          let folderPath = path.join(__dirname, `../data/${school.name}`)
          this.mkdir(folderPath)
          let scoreFilePath = path.join(folderPath, `./scoreList-${year}.json`)
  
          fs.writeFileSync(scoreFilePath, JSON.stringify({scoreList}))
          console.log(`${year}年${school.name}专业分数线写入完成`)
        }
      }
    }catch(e) {
      console.log('----------------  error  ----------------')
      console.log(`${year}年${school.name}专业分数线接口获取失败`)
      console.log(e)
      // 如果获取失败尝试重新获取3次
      if(!school.retryTime) {
        school.retryTime = 1
        setTimeout(async () => {
          await this.getScoreData(school, year, scoreList, page, total)
        }, 60 * 1000)
      } else if (school.retryTime < 3) {
        school.retryTime++
        setTimeout(async () => {
          await this.getScoreData(school, year, scoreList, page, total)
        }, 60 * 1000)
      }
    }
  }

  // 创建文件夹
  mkdir(folderpath: string) {
    const pathArr = folderpath.split('/');
    let _path = '';
    for (let i = 0; i < pathArr.length; i++) {
      if (pathArr[i]) {
        _path += `${pathArr[i]}/`;
        if (!fs.existsSync(_path)) {
          fs.mkdirSync(_path);
        }
      }
    }
  }
}

const crowller = new Crowller()
