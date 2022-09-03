import { connect } from "react-redux";
import { ApplicationState } from "../store";
import PropTypes from 'prop-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Spinner({loading}:any) {
    return (<div style={{display: loading ? 'block' : 'none'}} id="spinner-wrapper">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>)
}

Spinner.propTypes = {
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = ({ spinner }: ApplicationState) => ({
    loading: spinner.loading
});

const mapDispatchProps = () => {
    return {};
};
  
export default connect(mapStateToProps, mapDispatchProps)(Spinner);