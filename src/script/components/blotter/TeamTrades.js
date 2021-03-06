const debug = require('debug')('trader:blotter');

import React from 'react'
import {connect} from 'react-redux'
import StreamingPriceReceiver from '../StreamingPriceReceiver'
import blotter from '../../services/blotter'
import moment from 'moment'
import Value from '../Value'

import { AutoSizer, FlexTable, FlexColumn, VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './blotter.style.scss';

const StreamingValue = StreamingPriceReceiver(Value);

function renderContent(teamTrades) {

  return (props) => {

      debug('props', props);

      return <FlexTable
          width={props.width}
          height={230}
          headerHeight={20}
          rowHeight={30}
          rowsCount={teamTrades.length}
          rowGetter={index => teamTrades[index]}>
          <FlexColumn
            label='Date'
            dataKey='date'
            width={200}
            cellRenderer={ (cellData, cellDataKey, rowData, rowIndex, columnData) => <span>{moment(rowData.date).format('D MMM YYYY h:mm:ss')}</span> }

          />
          <FlexColumn
            label='Direction'
            dataKey='direction'
            width={100}
          />

          <FlexColumn
            label='CCY'
            dataKey='ccyCpl'
            width={100}
          />

          <FlexColumn
            label='Notional'
            dataKey='notional'
            width={100}
          />

          <FlexColumn
            label='Rate'
            dataKey='rate'
            width={100} 
          />

          <FlexColumn
            label='PnL'
            dataKey='rate'
            width={100}
            cellRenderer={ (cellData, cellDataKey, rowData, rowIndex, columnData) => <StreamingValue notional={rowData.notional} rate={rowData.rate} direction={rowData.direction} ccyCpl={rowData.ccyCpl} /> }
          />

          <FlexColumn
            label='Status'
            dataKey='status'
            width={100} 
          />
        </FlexTable>};
}

export default function TeamTrades ( { teamTrades } ) {

  return  <div className="autosizer-container">
            <AutoSizer disableHeight>
              {renderContent(teamTrades)}
            </AutoSizer>
          </div>;
}