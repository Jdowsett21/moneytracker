import React from 'react';
import * as Yup from 'yup';
import FormInput from '../FormInput';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { addBudget } from '../../actions/BudgetActions';
import Label from './../common/Label';
import GradientButton from '../common/GradientButton';
const budgetValidation = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  budgetLimit: Yup.number().required('Budget Limit is required'),
});

function AddBudgetModal({ addBudget }) {
  return (
    <div id='addBudget' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-body'>
            <Formik
              validationSchema={budgetValidation}
              initialValues={{ category: '', budgetLimit: '' }}
              onSubmit={(values) => addBudget(values)}
            >
              {() => (
                <Form>
                  <Label text='Category' />
                  <FormInput
                    ariaLabel='Category'
                    name='category'
                    type='text'
                    placeholder='Category'
                  />
                  <Label text='Category' />
                  <Label text='Budget Limit' />
                  <FormInput
                    ariaLabel='Budget Limit'
                    name='budgetLimit'
                    type='text'
                    placeholder='Budget Limit'
                  />
                  <GradientButton type='submit' text='Add Budget' />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { addBudget })(AddBudgetModal);
