import React from 'react';
import { useField } from 'formik';
import FormError from './FormError';

const FormInput = ({ ariaLabel, name, type, placeholder }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <input
        {...field}
        className='form-control border-primary'
        aria-label={ariaLabel}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <li class='nav-item dropdown'>
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
        <ul class='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
          {budgetCategoryList.map((budget) => (
            <li class='dropdown-submenu'>
              <a class='dropdown-item dropdown-toggle' href='http://google.com'>
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
      </li>
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </>
  );
};

export default FormInput;
