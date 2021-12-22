import { CHECKOUT_URL } from 'SourceRoute/Checkout/Checkout.config';
import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component'
import ContentWrapper from 'SourceComponent/ContentWrapper';
import { appendWithStoreCode } from 'Util/Url';

export class Checkout extends SourceCheckout {
    constructor(props) {
        super(props);
        this.state = {
            progressbarWidth: 35,
        }
    }
    updateStep() {
        const { checkoutStep, history } = this.props;
        const { url } = this.stepMap[checkoutStep];

        history.push(appendWithStoreCode(`${ CHECKOUT_URL }${ url }`));
        this.setState({ progressbarWidth: 65, })
    }

    getProgressBarWidth() {
        
    }

    renderProgressItem(step, stepkey, index) {
        return (<div block="ProgressStepContainer">
            <div block="ProgressStep">
                <div  block={`ProgressIndex ${stepkey === this.props.checkoutStep ? "ActiveStep" : ""}`}>
                    <p>{index}</p>
                    </div>
                <div>{step.title}</div>
                </div>
            </div>);
    }

    renderProgressbar() { 
        return <div block="ProgressBar" role="button">
            <div block="ProgressBar-Bar" style={{width: `${this.state.progressbarWidth}%`}} />
            <div block="ProgressList">{
            Object.keys(this.stepMap).map((stepkey, index) => {
                if (this.stepMap[stepkey] !== this.stepMap.DETAILS_STEP) {
                    return this.renderProgressItem(this.stepMap[stepkey], stepkey, index + 1);
                }
                return null;
            })
        }</div></div>
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