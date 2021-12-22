import { CHECKOUT_URL } from 'SourceRoute/Checkout/Checkout.config';
import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component'
import ContentWrapper from 'SourceComponent/ContentWrapper';
import { appendWithStoreCode } from 'Util/Url';

export class Checkout extends SourceCheckout {
    constructor(props) {
        super(props);
        const percentageincrement = 100 / Object.keys(this.stepMap).length + 1;
        this.state = {
            progressbarWidth: percentageincrement,
            progressCount: 0,
            doneSteps: [],
        }
    }
    updateStep() {
        let prevStep = "";
        const percentageincrement = 100 / Object.keys(this.stepMap).length + 1;
        const { checkoutStep, history } = this.props;
        const { url } = this.stepMap[checkoutStep];
        Object.keys(this.stepMap).forEach((el, index) => {
            if (el === checkoutStep && index !== 0) {
                prevStep = Object.keys(this.stepMap)[index - 1];
            }
            
        });
        history.push(appendWithStoreCode(`${ CHECKOUT_URL }${ url }`));
        this.setState((prevstate) => ({ 
            progressbarWidth: prevstate.progressbarWidth + percentageincrement, 
            progressCount: prevstate.progressCount + 1,
            doneSteps: [...prevstate.doneSteps, prevStep]
        }));
    }

    renderProgressItem(step, stepkey, index) {
        return (<div block="ProgressStepContainer">
            <div block="ProgressStep">
                <div  block={`ProgressIndex ${this.state.doneSteps.includes(stepkey) ? "FinishedStep" : ""} ${stepkey === this.props.checkoutStep ? "ActiveStep" : ""}`}>
                    {this.state.doneSteps.includes(stepkey) ? <div block="CheckIconContainer"><div block="CheckIcon"></div> </div>: <p>{index}</p> }
                    
                    </div>
                <div>{step.title}</div>
                </div>
            </div>);
    }

    renderProgressbar() { 
        return <div block="ProgressBar" role="button">
            <div block="ProgressBar-Bar" style={{width: `${Math.round(this.state.progressbarWidth)}%`}} />
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