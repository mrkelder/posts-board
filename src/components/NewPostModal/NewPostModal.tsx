import { Dispatch, FC, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Input,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { ChangeEventHandler, useCallback } from "react";
import { useModalReducer } from "./useModalReducer";

interface AddNewPostModalProps {
  open: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
}

export const NewPostModal: FC<AddNewPostModalProps> = ({ open, setter }) => {
  const { formData, formDispatch } = useModalReducer();
  const { content, isImageLoading, title, image } = formData;

  const fileChangeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      if (target.files && target.files.length > 0) {
        formDispatch({ type: "change_file_loading", payload: true });
        const fileReader = new FileReader();
        fileReader.onload = (data) => {
          // FIXME: make it look better
          if (data.target) {
            formDispatch({
              type: "change_file_field",
              payload: String(data.target.result),
            });
            formDispatch({
              type: "change_file_loading",
              payload: false,
            });
          } else alert("Some error occured");
        };
        fileReader.readAsDataURL(target.files[0]);
      }
    },
    [formDispatch]
  );

  const closeModal = useCallback(() => {
    setter(false);
  }, [setter]);

  const isNewPostReadyToBeSent =
    content.length > 0 && title.length > 0 && image && !isImageLoading;

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={closeModal}>
      <DialogTitle>
        Add new post
        {/* <IconButton onClick={toggleModalDisplay}>
      TODO: add icon here
    </IconButton> */}
      </DialogTitle>
      <DialogContent>
        <Stack py={1} spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={({ target }) =>
              formDispatch({
                type: "change_text_field",
                payload: { name: "title", value: target.value },
              })
            }
          />
          <TextField
            label="Content"
            multiline
            placeholder="Did you know this is a multiline input?"
            maxRows={8}
            value={content}
            onChange={({ target }) =>
              formDispatch({
                type: "change_text_field",
                payload: { name: "content", value: target.value },
              })
            }
          />
          <Input
            type="file"
            disabled={isImageLoading}
            inputProps={{ accept: "image/*" }}
            onChange={fileChangeHandler}
          />
          <Fade in={isImageLoading}>
            <Typography>Post image is being loaded, please wait</Typography>
          </Fade>
          <Stack flexDirection="row" gap={1} justifyContent="end">
            <Button disabled={!isNewPostReadyToBeSent} variant="contained">
              Submit
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
