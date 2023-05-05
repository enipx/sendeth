import { View, Text } from "@oreo-ui/web"

const Header = () => {
  return (
    <View textAlign="center">
      <Text fontSize="xl" fontWeight="600">Sendeth</Text>
      <Text fontSize="sm" opacity="0.85">
        A simple web3 dapp that makes sending Eth to anyone a breeze ⚡
      </Text>
    </View>
  )
}

export default Header;