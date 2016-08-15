import React from 'react';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsySelect = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      hasChanged: false,
    };
  },

  handleChange(event, index, value) {
    this.setValue(value);

    this.setState({
      hasChanged: value !== '',
    });

    if (this.props.onChange) this.props.onChange(event, value, index);
  },

  errorMessage:function(){
    if(this.isPristine())
      return '';
    return this.getErrorMessage()
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    let { value, ...rest } = this.props;
    value = this.state.hasChanged ? this.getValue() : value;

    return (
      <SelectField
        {...rest}
        errorText={this.errorMessage()}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={value}
      >
        {this.props.children}
      </SelectField>
    );
  },
});

export default FormsySelect;
