import Formsy from 'formsy-react'

Formsy.addValidationRule('choice', function (values, value, otherField) {
    // The this context points to an object containing the values
    // {childAge: "", parentAge: "5"}
    // otherField argument is from the validations rule ("childAge")
    return !!value || !!values[otherField];
});