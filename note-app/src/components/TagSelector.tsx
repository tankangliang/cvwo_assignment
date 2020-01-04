import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { setFilter } from "../reducers/tagsReducer";
import {
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

const mapState = (state: RootState) => ({
  tags: state.tags
});

const connector = connect(mapState, { setFilter });
type PropsFromRedux = ConnectedProps<typeof connector>;

const TagSelector = (props: PropsFromRedux) => {
  const allTags = props.tags.all;

  const handleCheck = (tag: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setFilter(tag);
  };
  return (
    <div style={{ height: "100%", margin: 20 }}>
      <FormControl>
        <FormLabel>Filter by tags</FormLabel>
        <FormGroup style={{ textTransform: "capitalize" }}>
          {allTags.map(tag => {
            return (
              <FormControlLabel
                key={tag}
                label={tag}
                control={
                  // tslint:disable-next-line: jsx-wrap-multiline
                  <Checkbox
                    checked={props.tags.filter.includes(tag)}
                    value={tag}
                    onChange={handleCheck(tag)}
                  />
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default connector(TagSelector);
