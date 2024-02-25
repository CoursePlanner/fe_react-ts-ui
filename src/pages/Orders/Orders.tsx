import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import { Location, NavigateFunction } from 'react-router-dom'
import './styles.scss'
import {
  OrderItem,
  OrderItemsList,
  OrderPagination,
  OrderState,
  loadAllOrdersHistory,
} from '../../utils/store/OrderReducer'
import {
  PageState,
  setDataLoadingState,
} from '../../utils/store/PageStateReducer'
import { Button, Col, Row } from 'react-bootstrap'

export interface OrderProps {
  location: Location<any>
  navigate: NavigateFunction
  path: string
  setDataLoadingState(pageState: boolean): void
  loadAllOrdersHistory(orderPagination: OrderPagination): void
  pageState: PageState
  ordersList: OrderItemsList
}

class OrdersView extends React.Component<OrderProps> {
  componentDidMount = () => {
    this.loadOrderDetails({
      page: 0,
      size: 10,
      direction: 'DESC',
    })
  }

  loadOrderDetails = async (pagination: OrderPagination) => {
    this.props.setDataLoadingState(true)
    await this.props.loadAllOrdersHistory(pagination)
    this.props.setDataLoadingState(false)
  }

  renderOrderItems = (data: OrderItem, index: number): ReactNode => {
    const itemColor =
      data.orderStatus === 'COMPLETED'
        ? 'btn-success'
        : data.orderStatus === 'FAILED'
        ? 'btn-danger'
        : 'btn-warning'
    return (
      <div
        className={`btn ${itemColor} order-list-item justify-content-around w-100 mb-3`}
        key={`order_item_key_${index}`}
      >
        <Row className='order-list-item-header d-flex justify-content-between w-100 ps-4'>
          <Col sm={6} className='d-flex justify-content-start mt-2'>
            <span>Placed On</span>
            <span className="me-2">:</span>
            <span>{data.purchasedOn}</span>
          </Col>
          <Col sm={6} className='d-flex justify-content-end mt-2'>
            <span>Order ID</span>
            <span className="me-2">:</span>
            <span>#{data.orderId}</span>
          </Col>
          <Col sm={12} className='d-flex justify-content-start mt-2'>
            <span>{data.productName}</span>
          </Col>
        </Row>
        <Row className='order-list-item-body d-flex justify-content-start w-100 ps-4 mb-2'>
          <Col sm={12} className='d-flex justify-content-start mt-2'>
            <span>Rs</span>
            <span className="me-2">.</span>
            <span>{data.productPrice}</span>
          </Col>
          <Col sm={6} className='d-flex justify-content-start mt-2'>
            <span>Status</span>
            <span className="me-2">:</span>
            <span>{data.orderStatus}</span>
          </Col>
          <Col sm={6} className='d-flex justify-content-end'>
            <span>
              <Button className='btn-dark'>See More Details</Button>
            </span>
          </Col>
        </Row>
      </div>
    )
  }

  renderPagination = (paginationObj: OrderPagination): ReactNode => {
    return null
  }

  render(): ReactNode {
    return (
      <div className="order-root w-100 p-3">
        {!this.props.pageState.isDataLoading &&
        this.props.ordersList.orders.length === 0 ? (
          <div>No orders found!</div>
        ) : (
          <>
            <div className="order-list-parent w-100 d-flex justify-content-center flex-wrap">
              {this.props.ordersList.orders.map(this.renderOrderItems)}
            </div>
            <div className="order-list-pagination w-100">
              {this.renderPagination(this.props.ordersList.pagination)}
            </div>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (
  state: {
    userOrdersSlice: OrderState
    pageStateReducer: PageState
  },
  props: OrderProps,
) => {
  return {
    ...props,
    ordersList: state.userOrdersSlice.allOrders,
    pageState: state.pageStateReducer,
  }
}

export const Orders = connect(mapStateToProps, {
  loadAllOrdersHistory,
  setDataLoadingState,
})(OrdersView)
