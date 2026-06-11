import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  Time,
  SeriesOptionsMap,
  CandlestickSeries
} from 'lightweight-charts';

@Component({
  selector: 'app-symbol-chart',
  standalone: false,
  templateUrl: './symbol-chart.html',
  styleUrls: ['./symbol-chart.scss']
})
export class SymbolChart implements AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef<HTMLDivElement>;

  @Input() candles: CandlestickData<Time>[] = [];
  @Input() symbol!: string;

  private chart: IChartApi | null = null;
  private series: ISeriesApi<keyof SeriesOptionsMap> | null = null;
  private initialized = false;

  ngAfterViewInit() {
    // Only initialize when container exists AND candles exist
    if (this.candles.length > 0) {
      this.initializeChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // If candles arrive before AfterViewInit, wait
    if (changes['candles'] && this.candles.length > 0) {
      if (!this.initialized && this.chartContainer?.nativeElement) {
        this.initializeChart();
      } else if (this.series) {
        this.series.setData(this.candles);
      }
    }
  }

  private initializeChart() {
    if (this.initialized) return;
    this.initialized = true;

    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: 300,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333'
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' }
      }
    });

    this.series = this.chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderUpColor: '#26a69a',
      borderDownColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      borderVisible: true,
      wickVisible: true
    });

    if (this.series) {
      this.series.setData(this.candles);
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.remove();
      this.chart = null;
      this.series = null;
      this.initialized = false;
    }
  }
}
