import React, { useState } from "react";
import {
  Box,
  Layer,
  Heading,
  Text,
  Form,
  FormField,
  RadioButtonGroup,
  Button,
} from "grommet";
import { useRecoilState } from "recoil";
import { GameStat, Room } from "../../state";
import { CenteredPopupLayer } from "../atoms/CenteredPopupLayer";

export function ActionCancelAffinitySelector({ onAction }) {
  const [room] = useRecoilState(Room);
  const { affinities: affinities = undefined } = room;

  const [affinity, setAffinity] = useState(
    Object.keys(affinities).map((affinity) => {
      return { id: affinity, label: affinities[affinity] };
    })
  );

  return (
    <CenteredPopupLayer>
      <Box pad={"small"} height={"fit-content"} width={"large"}>
        <Box direction="column">
          <Heading level={2}>Action Cancel Affinity Selector</Heading>
          <Box flex={"grow"}></Box>
          {affinities ? (
            <Form
              onSubmit={({ value }) => {
                console.log(value);
              }}
            >
              <FormField name="affinities">
                <RadioButtonGroup
                  name="affinities"
                  options={affinity}
                ></RadioButtonGroup>
              </FormField>
              <Button type="submit" label={"Submit"} />
            </Form>
          ) : null}
        </Box>
      </Box>
    </CenteredPopupLayer>
  );
}
