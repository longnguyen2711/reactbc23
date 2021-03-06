import React, { Component } from 'react'

// Kết nối redux
import { connect } from 'react-redux'

class GioHangRedux extends Component {

//   tinhTongSoLuong = () => {
// // Cách 1:
// //       let tongSL = 0;
// //       for(let spGH of this.props.stateGiohang){
// //           tongSL += spGH.soLuong
// //       }

// // Cách 2:
//       let tongSoLuong = this.props.stateGiohang.reduce((tongSoLuong, spGH, index) => {
//         tongSoLuong += spGH.soLuong;}, 0);

//         return tongSoLuong
  

// let tongTien = this.props.stateGiohang.reduce((tt, spGH) => {
//     // Mỗi lần duyệt qua mỗi sản phẩm tính tổng tiền của sản phẩm đó rồi cộng dồn vào kết quá của hàm reduce
//     let tong = spGH.giaBan * spGH.soLuong;
//     return tt + tong;},0)

//     return tongSoLuong + ' - ' + tongTien.toLocaleString()
// }


  render() {    
    return (
      <div>
          <div className='text-right'>
            <p className='text-danger font-weight-bold'>Giỏ hàng ({this.props.stateGiohang.reduce((tongSoLuong, spGH, index) => {
                return tongSoLuong += spGH.soLuong;}, 0)})
            </p>            
          </div>
          <table style={{textAlign: "center", valign: "middle"}} className='table'>
            <thead>
                <tr className='bg-warning'>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Giá bán</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th> 
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.props.stateGiohang.map((spGH, index) => {
                    return <tr key={index}>
                        <td>{spGH.maSP}</td>
                        <td>{spGH.tenSP}</td>
                        <td><img src={spGH.hinhAnh} width={50} height={50}/></td>
                        <td>{spGH.giaBan.toLocaleString()}</td>

                        <td>
                            <button onClick={() => {
                                this.props.tangGiamSoLuong(spGH.maSP, 1)}} className='btn btn-primary mr-2'>+
                            </button>
                            {spGH.soLuong.toLocaleString()}
                            <button onClick={() => {
                                this.props.tangGiamSoLuong(spGH.maSP, -1)}} className='btn btn-primary ml-2'>-
                            </button>
                        </td>

                        <td>{(spGH.giaBan * spGH.soLuong).toLocaleString()}</td>
                        <td>
                            <button onClick={() => {
                                this.props.xoaGioHang(spGH.maSP)
                            }} className='btn btn-danger'>
                                Xóa
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{fontWeight: "bold"}}></td>
                    <td style={{fontWeight: "bold"}}>{this.props.stateGiohang.reduce((tongTien, spGH, index) => {
                        return tongTien += spGH.giaBan * spGH.soLuong;
                    }, 0).toLocaleString()} VNĐ</td>
                </tr>
            </tfoot>
          </table>
      </div>
    )
  }
}


// Định nghĩa hàm mapStateToProps lấy dữ liệu redux về
const mapStateToProps = (rootReducer) => {
    return{
        stateGiohang: rootReducer.gioHangReducer
    }
}

// Định nghĩa sử kiện xóa giỏ hàng
const mapDispatchToProps = (dispatch) => {
    return  {
        xoaGioHang: (maSPClick) => {
            // Tạo ra action gửi lên redux
            const action = {
                type: 'XOA_GIO_HANG',
                maSPClick
            }
            // Đưa dữ liệu lên redux
            dispatch(action);
        },

        tangGiamSoLuong: (maSPClick, soTangGiam) => {            
            const action = {
                type: 'TANG_GIAM_SO_LUONG',
                maSPClick,
                soTangGiam
            }
            dispatch(action)
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GioHangRedux)