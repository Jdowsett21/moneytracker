import React from 'react';
import * as Yup from 'yup';
import FormInput from '../common/FormInput';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { addBudgetCategory } from '../../actions/BudgetCategoriesActions';
import Label from '../common/Label';
import GradientButton from '../common/GradientButton';
const budgetValidation = Yup.object().shape({
  category: Yup.string().required('Category is required'),
});

function AddBudgetCategoryModal({
  addBudgetCategory,
  budgetCategories: { budgetCategoryList },
}) {
  return (
    <div id='addBudgetCategory' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <h2>Create A Budget</h2>
          <div className='modal-body'>
            <Formik
              validationSchema={budgetValidation}
              initialValues={{ category: '', subCategory: '' }}
              onSubmit={(values) => addBudgetCategory(values)}
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
                    >
                      {budgetCategoryList.map((budget) => (
                        <li class='dropdown-submenu'>
                          <a
                            class='dropdown-item dropdown-toggle'
                            href='http://google.com'
                          >
                            {budget.category}
                          </a>
                          <ul class='dropdown-menu'>
                            {budgetCategoryList.map(
                              (b) =>
                                budget.category === b.category && (
                                  <li>
                                    <a class='dropdown-item' href='#'>
                                      {b.subCategory}
                                    </a>
                                  </li>
                                )
                            )}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li> */}
                  <Label text='Category' />
                  <FormInput
                    ariaLabel='Category'
                    name='category'
                    type='text'
                    placeholder='Category'
                  />
                  <Label text='subCategory' />
                  <FormInput
                    ariaLabel='subCategory'
                    name='subCategory'
                    type='text'
                    placeholder='subCategory'
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

const mapStateToProps = (state) => ({
  budgetCategories: state.budgetCategories,
});

export default connect(mapStateToProps, { addBudgetCategory })(
  AddBudgetCategoryModal
);
