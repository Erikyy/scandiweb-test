import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component'
import ContentWrapper from 'SourceComponent/ContentWrapper';

export class Checkout extends SourceCheckout {
    constructor(props) {
        super(props);
        
    }

    renderProgressItem(step, index) {
        
        return (<div block="ProgressStepContainer">
            <div block="ProgressStep">
                <div block={`ProgressIndex ${step === this.props.currentStep ? "ActiveStep" : ""}`}>
                    <p>{index}</p>
                    </div>
                <div>{step.title}</div>
                </div>
            </div>);
    }

    renderProgressbar() { 
        return <div block="ProgressBar">
            <div block="ProgressBar-Bar" style={{width: "35%"}} />
            <div block="ProgressList">{
            Object.keys(this.stepMap).map((stepkey, index) => {
                if (this.stepMap[stepkey] !== this.stepMap.DETAILS_STEP) {
                    return this.renderProgressItem(this.stepMap[stepkey], index + 1);
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