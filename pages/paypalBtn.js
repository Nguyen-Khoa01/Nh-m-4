import { useEffect, useRef } from 'react'

const paypalBtn = ({total, address, mobile, state, dispatch}) => {
    const refPaypalBtn = useRef()
    const {cart, auth} = state

    useEffect(() => {
        paypal.Buttons({
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: total // Can also reference a variable or function
                  }
                }]
              });
            },
            // Finalize the transaction after payer approval
            onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                console.log(data);
                alert('Transaction completed by ' + details.payer.name.given_name);
              });
            }
          }).render(refPaypalBtn.current);
    }, [])
    return (
        <div ref={refPaypalBtn.current} />
    )
}
export default paypalBtn