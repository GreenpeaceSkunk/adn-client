import { AxiosResquestError, IUser } from 'greenpeace';
import { ApiCall } from '../../utils/apiCall';

// const save = async (data: IUser): Promise<any | AxiosResquestError> => (
//   ApiCall({
//     method: 'POST',
//     url: `${process.env.REACT_APP_API_URL}user`,
//     data,
//   })
// )

const save = async (data: IUser): Promise<any | AxiosResquestError> => (
  ApiCall({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/forms/save`,
    data: {
      form_id: `${process.env.REACT_APP_FORM_ID}`,
      ...data,
    },
  })
)

export {
  save,
};