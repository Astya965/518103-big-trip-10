import AbstractSmartComponent from "./abstract-smart-component.js";

import {Transfers} from '../mocks/event.js';
import {LegendName, LabelPrefix} from '../utils/constants.js';
import {getLegendWithEmoji} from '../utils/statistics.js';

import Chart from "chart.js";
import chartjsPluginDatalabes from "chartjs-plugin-datalabels";
import moment from "moment";

export default class Statistics extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return (
      `<section class="statistics">
        <h2 class="visually-hidden">Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>`
    );
  }

  rerender() {
    super.rerender();
    this._renderCharts();
  }

  show() {
    super.show();
    this.rerender();
  }

  recoveryListeners() {}

  _generateChartsData(points) {
    const timeStatictics = {};
    const transportStatistics = {};
    const moneyStatistics = {};

    points.forEach((point) => {
      if (point.type in moneyStatistics) {
        moneyStatistics[point.type] += point.price;
      } else {
        moneyStatistics[point.type] = point.price;
      }

      if (point.type in transportStatistics) {
        transportStatistics[point.type] += 1;
      } else if (Transfers.includes(point.type)) {
        transportStatistics[point.type] = 1;
      }

      if (point.type in timeStatictics) {
        timeStatictics[point.type] += point.endDate - point.startDate;
      } else {
        timeStatictics[point.type] = point.endDate - point.startDate;
      }
    });

    const moneyData = Object.entries(moneyStatistics).sort((a, b) => b[1] - a[1]);

    const transportData = Object.entries(transportStatistics)
    .sort((a, b) => b[1] - a[1]);

    const timeData = Object.entries(timeStatictics)
    .sort((a, b) => b[1] - a[1])
    .map((item) => {
      return [
        item[0],
        Math.round(moment.duration(item[1], `milliseconds`).asHours())
      ];
    })
    .filter((item) => item[1] !== 0);

    return {
      moneyData,
      transportData,
      timeData
    };
  }

  _createChart(ctx, data, label, legend, isLabelPositonLeft = false) {
    return new Chart(ctx, {
      type: `horizontalBar`,
      plugins: [chartjsPluginDatalabes],
      data: {
        labels: data.map((item) => getLegendWithEmoji(item[0])),
        padding: 110,
        datasets: [
          {
            label: legend.toUpperCase(),
            data: data.map((item) => item[1]),
            backgroundColor: `white`,
            minBarLength: 40,
            barThickness: 32
          }
        ]
      },
      options: {
        responsive: false,
        aspectRatio: 2,
        legend: {
          position: `left`,
          labels: {
            fontColor: `black`,
            fontSize: 18,
            fontStyle: `bold`,
            padding: 100,
            boxWidth: 0
          }
        },
        tooltips: {
          mode: `nearest`,
          titleAlign: `right`
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        plugins: {
          datalabels: {
            labels: {
              title: {
                font: {
                  weight: `bold`,
                  size: 15
                }
              }
            },
            anchor: `end`,
            align: `left`,
            formatter(value) {
              return isLabelPositonLeft ? `${label}${value}` : `${value}${label}`;
            }
          }
        }
      }
    });
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    const {moneyData, transportData, timeData} = this._generateChartsData(this._pointsModel.getPoints());

    this._moneyChart = this._createChart(moneyCtx, moneyData, LabelPrefix.EURO, LegendName.MONEY, true);
    this._transportChart = this._createChart(transportCtx, transportData, LabelPrefix.TIMES, LegendName.TRANSPORT);
    this._timeChart = this._createChart(timeCtx, timeData, LabelPrefix.HOURS, LegendName.TIME);
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeChart) {
      this._timeChart.destroy();
      this._timeChart = null;
    }
  }

}
