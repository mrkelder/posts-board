import { useReducer } from "react";

interface NewPostFormData {
  title: string;
  content: string;
  image: string | null;
  isImageLoading: boolean;
}

interface NewPostUpdateTextFieldAction {
  type: "change_text_field";
  payload: {
    name: Exclude<keyof NewPostFormData, "image">;
    value: string;
  };
}

interface NewPostUpdateFileFieldAction {
  type: "change_file_field";
  payload: string | null;
}

interface NewPostUpdateFileLoadingAction {
  type: "change_file_loading";
  payload: boolean;
}

type NewPostFormActions =
  | NewPostUpdateTextFieldAction
  | NewPostUpdateFileFieldAction
  | NewPostUpdateFileLoadingAction;

const newPostDefaultData: NewPostFormData = {
  title: "",
  content: "",
  image: null,
  isImageLoading: false,
};

const newPostReducer = (
  state: NewPostFormData,
  action: NewPostFormActions
): NewPostFormData => {
  switch (action.type) {
    case "change_text_field": {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case "change_file_field": {
      return {
        ...state,
        image: action.payload,
      };
    }
    case "change_file_loading": {
      return {
        ...state,
        isImageLoading: action.payload,
      };
    }
    default:
      return state;
  }
};

export const useModalReducer = () => {
  const [formData, formDispatch] = useReducer(
    newPostReducer,
    newPostDefaultData
  );

  return { formData, formDispatch };
};
