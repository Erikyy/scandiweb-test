import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component'
import ContentWrapper from 'SourceComponent/ContentWrapper';

export class Checkout extends SourceCheckout {
    renderProgressbar() {
        return <h1>progress bar</h1>
    }
    
    render() {
        return (
            <main block="Checkout">
                { this.renderProgressbar() }
                <ContentWrapper
                  wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    { this.renderSummary(true) }
                    <div block="Checkout" elem="Step">
                        { this.renderTitle() }
                        { this.renderGuestForm() }
                        { this.renderStep() }
                        { this.renderLoader() }
                    </div>
                    <div>
                        { this.renderSummary() }
                        { this.renderPromo() }
                        { this.renderCoupon() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}
export default Checkout;