import React from "react";

  const capitalizeWords = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };


const ThermalReceipt = React.forwardRef(({ cart, total, cashier, totalQuantity }, ref) => (
  <div
    ref={ref}
    style={{
      width: "280px",
      fontSize: "12px",
      padding: "10px",
      fontFamily: "monospace",
      whiteSpace: "pre-wrap",
      overflow: 'hidden'
    }}
  >
    {/* <h2 style={{ textAlign: "center", marginBottom: 0 }}>ELTRADE®</h2> */}
    {/* <hr /> */}
    ==============================================================
    <div style={{ textAlign: "center", lineHeight: "1.4" }}>
      <div>MK HOTEL AND LOUNGE</div>
      <div>A.A S.C K/KERANIYO</div>
      <div>W06 H. NO. NEW</div>
      <div>AROUND BETEL</div>
      <div>TEL. 0911529223</div>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "8px",
      }}
    >
      <div>{new Date().toLocaleDateString()}</div>
      <div>{new Date().toLocaleTimeString()}</div>
    </div>
    <div>Cashier name : {cashier}</div>
    <div style={{ margin: "3px 0" }}>
      ---------------------------------------
    </div>
    <div style={{ textAlign: "center", fontWeight: "bold" }}>
        CASH Invoice
    </div>
      <div>Invoice No. : 00022726</div>
    --------------------------------------
    {/* Items */}
    {cart.map((product) => (
      <div key={product.id} style={{ marginBottom: "2px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{capitalizeWords(product.productName)} <span style={{marginLeft: '2px'}}>x{product.quantity}</span></div>
          <span>*{(product.price * product.quantity).toFixed(2)}</span>
        </div>
      </div>
    ))}
    <div style={{textAlign: 'center'}}>
      --------------------------------
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>NOTAXBL</div>
      <span>*{total.toFixed(2)}</span>
    </div>
 <div style={{textAlign: 'center'}}>
      --------------------------------
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: "14px",
        margin: '0'
      }}
    >
      <span>TOTAL:</span>
      <span>*{total.toFixed(2)}</span>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: '0'
      }}
    >
      <span>CASH Birr:</span>
      <span>*{total.toFixed(2)}</span>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: '0',
        fontSize: '11px'
      }}
    >
      <span>ITEM #</span>
      <span>{totalQuantity}</span>
    </div>

    ===========================================================

  </div>
));

export default ThermalReceipt;
