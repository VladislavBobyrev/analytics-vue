<template>
  <section class="chart">
    <h3>Аналитака по визитам</h3>

    <div class="chart-body">
      <div id="chartdiv"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themesAnimated from '@amcharts/amcharts5/themes/Animated'

interface requestData {
    date: string | number,
     visits: number
}

export default defineComponent({
  setup()
  {
    return {}
  },
  mounted()
  {
    const root = am5.Root.new('chartdiv')


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themesAnimated.new(root),
    ])


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: 'panX',
      wheelY: 'zoomX',
      pinchZoomX: true,
    }))

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {
      behavior: 'none',
    }))
    cursor.lineY.set('visible', false)


    // Generate random data
    const date = new Date()
    date.setHours(0, 0, 0, 0)

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.5,
      baseInterval: {
        timeUnit: 'day',
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {
        pan: 'zoom',
      }),
      tooltip: am5.Tooltip.new(root, {}),
    }))

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 1,
      renderer: am5xy.AxisRendererY.new(root, {
        pan: 'zoom',
      }),
    }))


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
      name: 'Series',
      xAxis,
      yAxis,
      valueYField: 'visits',
      valueXField: 'date',
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}',
      }),
    }))

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
    })

    series.bullets.push(() => am5.Bullet.new(root, {
      locationY: 0,
      sprite: am5.Circle.new(root, {
        radius: 4,
        stroke: root.interfaceColors.get('background'),
        strokeWidth: 2,
        fill: series.get('fill'),
      }),
    }))


    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set('scrollbarX', am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    }))

    function generateDatas(value:requestData[])
    {
      const result:requestData[] = []
      value.forEach((item) =>
      {
        const year = new Date(item.date).getFullYear()
        const mounth = new Date(item.date).getMonth()
        const day = new Date(item.date).getDate()

        const date = Date.UTC(year, mounth, day)
        result.push({
          date,
          visits: item.visits,
        })
      })

      return result
    }

    const data:requestData[] = [
      { date: '2020-07-01', visits: 213 },
      { date: '2020-07-02', visits: 249 },
      { date: '2020-07-03', visits: 179 },
      { date: '2020-07-04', visits: 170 },
      { date: '2020-07-05', visits: 184 },
      { date: '2020-07-06', visits: 202 },
      { date: '2020-07-07', visits: 198 },
      { date: '2020-07-08', visits: 168 },
      { date: '2020-07-09', visits: 176 },
      { date: '2020-07-10', visits: 171 },
      { date: '2020-07-11', visits: 190 },
      { date: '2020-07-12', visits: 154 },
      { date: '2020-07-13', visits: 246 },
      { date: '2020-07-14', visits: 250 },
      { date: '2020-07-15', visits: 227 },
      { date: '2020-07-16', visits: 140 },
      { date: '2020-07-17', visits: 170 },
      { date: '2020-07-18', visits: 125 },
      { date: '2020-07-19', visits: 106 },
      { date: '2020-07-20', visits: 207 },
      { date: '2020-07-21', visits: 222 },
      { date: '2020-07-22', visits: 198 },
      { date: '2020-07-23', visits: 204 },
      { date: '2020-07-24', visits: 213 },
      { date: '2020-07-25', visits: 145 },
      { date: '2020-07-26', visits: 166 },
      { date: '2020-07-27', visits: 163 },
      { date: '2020-07-28', visits: 135 },
      { date: '2020-07-29', visits: 45 },
    ]

    const result = generateDatas(data)
    series.data.setAll(result)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000)
    chart.appear(1000, 100)
  },
})
</script>