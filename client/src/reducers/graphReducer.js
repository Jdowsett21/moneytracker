import { SET_NET_OVER_TIME_DATA, SET_CATEGORY_DATA, SET_MERCHANT_DATA, SET_OVER_TIME_DATA, SET_GRAPH_TYPE } from '../actions/types';
import moment from 'moment'
const initialState = {
  data: [],
  data1: [],
  data2: [],
  graphType: '',
  length: '',
  category: '',
  subCategory:''

};
export default (state = initialState, action) => {
  switch (action.type) {
    //setting time info for each graph based on dropdown menu in trends page

    case SET_GRAPH_TYPE:
      return {
        ...state,
        graphType: action.payload,
      };
    case SET_NET_OVER_TIME_DATA:
      const {timeInfo, data, type, subItem}= action.payload
     
      return {
        ...state,
        data: [...Array(timeInfo.length)].map((item, index) => {
          return {
            x: new Date(moment().subtract(timeInfo.length-index, timeInfo.unit)),
            y: data.reduce((acc, transaction)=> {
              if(moment().subtract(timeInfo.length-index, timeInfo.unit).format(timeInfo.format)=== moment(transaction.shortDate).format(timeInfo.format) && transaction.paymentType ==='Deposit'){
                return transaction.amount+ acc
              }
              return acc
            }, 0),
          };
        }),
        data1: [...Array(timeInfo.length)].map((item, index) => {
          return {
            x: new Date(moment().subtract(timeInfo.length-index, timeInfo.unit)),
            y: data.reduce((acc, transaction)=> {
              if(moment().subtract(timeInfo.length-index, timeInfo.unit).format('MMM-DD-YYYY')=== transaction.shortDate && transaction.paymentType==='Withdrawal'){
                return transaction.amount+ acc
              }
              return acc
            }, 0),
          };
        }),
        data2: [...Array(timeInfo.length)].map((item, index) => {
          return {
            x: new Date(moment().subtract(timeInfo.length-index, timeInfo.unit)),
            y: data.reduce((acc, transaction)=> {
              if(moment().subtract(timeInfo.length-index, timeInfo.unit).format('MMM-DD-YYYY')=== transaction.shortDate){
                return transaction.amount+ acc
              }
              return acc
            }, 0),
          };
        }),

        category: type,
        subCategory: subItem,
        length: timeInfo.length
      };
      case SET_CATEGORY_DATA:
      return {
        ...state,
        data: [...new Set(action.payload.data.map((item)=> item.subCategory))].map((subCat, index) => {
          return {
            label: subCat,
            y: (action.payload.data.reduce((acc, transaction)=> {
              if(subCat=== transaction.subCategory){
                return transaction.amount+ acc}
              })/ action.payload.data.reduce((acc, transaction)=>  transaction.amount+ acc, 0))*100,
            }
        }),
        category: action.payload.type,
        subCategory: action.payload.subItem,
        length: action.payload.timeInfo.length

      }   
      case SET_MERCHANT_DATA:
        return {
          ...state,
          data: [...new Set(action.payload.data.map((item)=> item.description))].map((description, index) => {
            return {
              label: description,
              y: (action.payload.data.reduce((acc, transaction)=> {
                if(description=== transaction.description){
                  return transaction.amount+ acc}
                })/ action.payload.data.reduce((acc, transaction)=>  transaction.amount+ acc, 0))*100,
              }
            }),    
          category: action.payload.type,
          subCategory: action.payload.subItem,
          length: action.payload.timeInfo.length
        }   ;

        case SET_OVER_TIME_DATA:
          
         
          return {
            ...state,
            data: [...Array(action.payload.timeInfo.length)].map((item, index) => {
              return {
                x: new Date(moment().subtract(action.payload.timeInfo.length-index-1, action.payload.timeInfo.unit)),
                y: action.payload.data.reduce((acc, transaction)=> {
                  if(moment().subtract(action.payload.timeInfo.length-index-1, action.payload.timeInfo.unit).format(action.payload.timeInfo.format)=== moment(transaction.shortDate).format(action.payload.timeInfo.format)){
                    return action.payload.category ==='Spending'? (transaction.amount * -1 )+ acc :transaction.amount+ acc
                  }
                  return acc
                }, 0),
              };
            }),
            category: action.payload.type,
            subCategory: action.payload.subItem,
            length: action.payload.timeInfo.length
          };
    default:
      return state;
  }
};
