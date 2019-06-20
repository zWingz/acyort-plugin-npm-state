// https://github.com/npm/registry/blob/master/docs/download-counts.md
import * as React from 'react'
import * as G2 from '@antv/g2'
import { http, NpmDownloadCount } from './http'
import { Context } from './Context'
type Prop = {
  repo: string
  range: string
}

type State = {
  downloads: NpmDownloadCount
}

export class NpmCount extends React.PureComponent<Prop, State> {
  state = {
    downloads: {
      downloads: [],
      start: '',
      end: '',
      package: ''
    }
  }
  chart: G2.Chart = null
  $el: React.RefObject<HTMLDivElement> = React.createRef()
  async getDownloadCount() {
    const data = await http.getRange(this.props.repo, this.props.range)
    this.setState(
      {
        downloads: data
      },
      () => {
        this.renderChart()
      }
    )
  }
  async componentDidMount() {
    this.getDownloadCount()
  }
  componentDidUpdate(prevProps: Prop, prevState) {
    const { repo, range } = this.props
    if (prevProps.repo !== repo || prevProps.range !== range) {
      this.getDownloadCount()
    }
  }
  renderChart() {
    let chart: G2.Chart
    if (!this.chart) {
      console.log('init')
      this.chart = new G2.Chart({
        container: this.$el.current,
        forceFit: true,
        height: 200,
        padding: 'auto'
      })
      chart = this.chart
      chart.scale('downloads', {
        alias: 'download count'
      })
      chart.scale('day', {
        alias: 'day',
        type: 'time'
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      chart
        .line()
        .position('day*downloads')
        .style({
          stroke: 'rgb(200,0,4)'
        })
      chart.source(this.state.downloads.downloads)
      this.chart.render()
    } else {
      this.chart.changeData(this.state.downloads.downloads)
    }
  }
  render() {
    const { repo } = this.props
    return (
      <div className='chart'>
        <div className='repo-title'>
          <a target='_blank' href={`https://www.npmjs.com/package/${repo}`}>
            {repo}
          </a>
        </div>
        <div className='g2-chart' ref={this.$el} />
      </div>
    )
  }
}
