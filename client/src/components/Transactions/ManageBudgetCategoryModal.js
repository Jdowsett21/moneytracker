import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  updateBudgetCategory,
  getBudgetSubCategories,
} from '../../actions/BudgetCategoriesActions';
import { ToastContainer, toast } from 'react-toastify';
import mongoose from 'mongoose';
function ManageBudgetCategoryModal({
  getBudgetSubCategories,
  updateBudgetCategory,
  budgetCategories: { budgetCategoryList, budgetSubCategories },
}) {
  const [categoryObject, setCategoryObject] = useState('');
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    setCategoryObject(budgetCategoryList[0]);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (budgetCategoryList.length > 0 && categoryObject) {
      getBudgetSubCategories(categoryObject.category);
    }
    //eslint-disable-next-line
  }, [budgetCategoryList, categoryObject]);

  const onSubmit = () => {
    if (subCategory === '') {
      return toast('Please Enter a Sub Category');
    } else {
      const addBudgetSub = {
        ...categoryObject,
        subCategories: [
          ...categoryObject.subCategories,
          { _id: mongoose.Types.ObjectId(), subCategory: subCategory },
        ],
      };

      updateBudgetCategory(addBudgetSub);
      setSubCategory('');
      toast('');
    }
  };
  return (
    <div id='budgetCategories' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <h2>Manage Your Categories</h2>
          <div className='modal-body'>
            <div className='d-flex justify-content-between'>
              <ul>
                {budgetCategoryList.map((c) => (
                  <li>
                    <a
                      href='/#'
                      className='extra-small-font'
                      onClick={() => setCategoryObject(c)}
                      key={c._id}
                    >
                      {c.category}
                    </a>
                  </li>
                ))}
              </ul>
              <div>
                <ul>
                  {budgetSubCategories &&
                    budgetSubCategories[0].subCategories.map((category) => (
                      <li>{category.subCategory}</li>
                    ))}
                  <a href='/#' onClick={onSubmit} className='btn btn-primary'>
                    Add Category
                  </a>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='subCategory'
                      value={subCategory}
                      className='form-control'
                      onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </div>
                  <ToastContainer closeOnClick />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  budgetCategories: state.budgetCategories,
});
export default connect(mapStateToProps, {
  updateBudgetCategory,
  getBudgetSubCategories,
})(ManageBudgetCategoryModal);
