import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useCallback, useReducer, useState } from "react";

interface NewPostFormData {
  title: string;
  content: string;
  image: string | null;
}

interface NewPostUpdateFieldAction {
  type: "change_field";
  payload: {
    name: keyof NewPostFormData;
    value: string;
  };
}

type NewPostFormActions = NewPostUpdateFieldAction;

const TITLE = "Global Wall";
const CONTENT_MAX_WIDTH = 380;

const newPostDefaultData: NewPostFormData = {
  title: "",
  content: "",
  image: null,
};

const newPostReducer = (
  state: NewPostFormData,
  action: NewPostFormActions
): NewPostFormData => {
  switch (action.type) {
    case "change_field": {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
  }
};

export default function Home() {
  const [shouldDisplayAddPostModal, setShouldDisplayAddPostModal] =
    useState(false);
  const [newPostFormData, newPostFormDispatch] = useReducer(
    newPostReducer,
    newPostDefaultData
  );

  const toggleModalDisplay = useCallback(() => {
    setShouldDisplayAddPostModal((prev) => !prev);
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Wall of posts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Box p={2} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            {TITLE}
          </Typography>
        </Box>
      </AppBar>

      <main>
        <Dialog
          fullWidth
          maxWidth="md"
          open={shouldDisplayAddPostModal}
          onClose={toggleModalDisplay}
        >
          <DialogTitle>
            Add new post
            {/* <IconButton onClick={toggleModalDisplay}>
              add icon here
            </IconButton> */}
          </DialogTitle>
          <DialogContent>
            <Stack py={1} spacing={2}>
              <TextField
                label="Title"
                value={newPostFormData.title}
                onChange={({ target }) =>
                  newPostFormDispatch({
                    type: "change_field",
                    payload: { name: "title", value: target.value },
                  })
                }
              />
              <TextField
                label="Content"
                multiline
                placeholder="Did you know this is a multiline input?"
                maxRows={8}
                value={newPostFormData.content}
                onChange={({ target }) =>
                  newPostFormDispatch({
                    type: "change_field",
                    payload: { name: "content", value: target.value },
                  })
                }
              />
              <Input type="file" />
              <Stack>
                <Button variant="contained">Submit</Button>
                <Button variant="outlined">Cancel</Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>

        <Stack alignItems="center" py={2} spacing={2}>
          <Button
            fullWidth
            sx={{ maxWidth: CONTENT_MAX_WIDTH }}
            variant="contained"
            onClick={toggleModalDisplay}
          >
            Add new post
          </Button>
          {new Array(10).fill(null).map((_, index) => (
            <Card
              key={`post_${index}`}
              sx={{ minWidth: 320, maxWidth: CONTENT_MAX_WIDTH, width: "100%" }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography variant="h6" component="strong" fontWeight="bold">
                  Card name
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  sequi corrupti accusamus ipsa voluptate enim quia illum
                  tempore eum impedit.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </main>
    </>
  );
}
