import { View, Text, Switch, useModeContext, Flex } from "@oreo-ui/web"
import { ChangeEvent } from "react";

const Footer = () => {
  const mode = useModeContext();

  const isDark = mode?.mode === 'dark';

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    mode?.toggle();
  }

  return (
    <View py="md">
      <Text opacity="0.85" fontSize="sm" textAlign="center">
        Copyright ©2023. All rights reserved.
      </Text>

      <Flex center mt="2xl" column>
        <Switch
          checked={isDark}
          onChange={onChangeHandler}
          key={mode?.mode}
        />

        <Text mt="md" fontSize="sm" fontWeight="500" textAlign="center">
          Switch to {isDark ? 'light' : 'dark'} mode
        </Text>
      </Flex>
    </View>
  )
}

export default Footer;