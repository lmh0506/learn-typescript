// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent'
import cheerio from 'cheerio'

interface Movie {
  title: string
}

class Crowller {
  constructor(private url: string){
    this.getRawHtml()
  }

  // 获取网页
  async getRawHtml() {
    const res = await superagent.get(this.url)
    this.getJsonInfo(res.text)
  }

  getJsonInfo(html: string) {
    const $ = cheerio.load(html)

    const movies: Movie[] = []

    const videoItems = $('.clearfix')
    videoItems.map((index, element) => {
      const title = $(element).find('.name > a').text()
      console.log(title)
      if(title) {
        movies.push({title})
      }
    })

    console.log(movies)
  }
}

const crowller = new Crowller('https://movie.douban.com/chart')
