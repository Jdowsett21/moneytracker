import React from 'react';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
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
          <h2>Create A Budget</h2>
          <div className='modal-body'>
            <Formik
              validationSchema={budgetValidation}
              initialValues={{ category: '', subCategory: '', budgetLimit: '' }}
              onSubmit={(values) => addBudget(values)}
            >
              {() => (
                <Form>
                  {/* <li class='nav-item dropdown'>
                    <a
                      class='nav-link dropdown-toggle'
                      href='#'
                      id='navbarDropdownMenuLink'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      {' '}
                    </a>
                    <ul
                      class='dropdown-menu'
                      aria-labelledby='navbarDropdownMenuLink'
                    > */}
                  {/* {budgetCategoryList.map((budget) => (
                        <li class='dropdown-submenu'>
                          <a
                            class='dropdown-item dropdown-toggle'
                            href='http://google.com'
                          >
                            {budget.category}
                          </a>
                          <ul class='dropdown-menu'>
                            {budget.subCategories.map((b) => (
                              <li>
                                <a class='dropdown-item' href='#'>
                                  {b}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))} */}
                  {/* </ul>
                  </li> */}
                  <Label text='Category' />
                  <FormInput
                    ariaLabel='Category'
                    name='category'
                    type='text'
                    placeholder='Category'
                  />
                  <Label text='SubCategory' />
                  <FormInput
                    ariaLabel='SubCategory'
                    name='subCategory'
                    type='text'
                    placeholder='SubCategory'
                  />

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
