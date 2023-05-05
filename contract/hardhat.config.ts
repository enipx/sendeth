// https://eth-goerli.g.alchemy.com/v2/HrewvKIWq9qqfwfK4NyaAt9PpU5WhD_A

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/HrewvKIWq9qqfwfK4NyaAt9PpU5WhD_A',
      accounts: ['6d84d64acaff4a1805dc568c6ee0e561c69f24ad2c756ee91608363de74364dc']
    },
  }
};

export default config;
