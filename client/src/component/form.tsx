import { TransactionContext } from "@/context/TransactionContext";
import { truncateWalletHandler } from "@/helper/base";
import { View, Text, Input, useModeTheme, Flex, Button, Textarea, Divider, Tooltip } from "@oreo-ui/web"
import { ChangeEvent, FormEvent, useContext, useState } from "react";

const RecipientForm = () => {
  const { borderColor, linkColor } = useModeTheme();

  const {
    connectWallet,
    currentAccount,
    sendDetails,
    setSendDetails,
    sendTransaction,
    loading
  } = useContext(TransactionContext);

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof typeof sendDetails) => {
    const { target } = evt;

    setSendDetails((prev) => {
      return {
        ...prev,
        [key]: target.value || ''
      }
    })
  }

  const onSendHandler = (evt: FormEvent<HTMLElement>) => {
    // send eth
    evt.preventDefault();

    sendTransaction();
  }

  const onConnectHandler = (evt: FormEvent<HTMLElement>) => {
    // connect wallet
    evt.preventDefault();

    connectWallet?.();
  }

  const renderConnectedAccount = () => {
    if (currentAccount) {
      return (
        <View>
          <View textAlign="center">
            <Text mb="sm" fontWeight="500" color={linkColor}>
              Connected Account:
            </Text>

            <Tooltip label={currentAccount}>
              <Text fontSize="sm">
                { truncateWalletHandler(currentAccount) }
              </Text>
            </Tooltip>
          </View>

          <Divider my="lg" />
        </View>
      )
    }

    return null;
  }

  return (
    <View
      border={`1px solid ${borderColor}`}
      p="lg"
      borderRadius="lg"
      my="lg"
      as="form"
      width="100%"
      onSubmit={onSendHandler}>
      {renderConnectedAccount()}

      <View mb="base">
        <Input
          label="Address"
          placeholder="0xcde...0aDe"
          value={sendDetails.address}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(evt, 'address')
          }}
        />
      </View>

      <View mb="base">
        <Input
          label="Amount"
          placeholder="0.0001 Eth"
          value={sendDetails.amount}
          type="number"
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(evt, 'amount')
          }}
        />
      </View>


      <View mb="base">
        <Textarea
          label="Message"
          placeholder="E.g. Congratulations, you have received we've recieved your order!"
          value={sendDetails.message}
          onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
            onChangeHandler(evt, 'message')
          }}
        />
      </View>
      
      <Flex spacing="md" mb="lg">
        <Button loading={loading} disabled={!sendDetails.address || !sendDetails.amount} text="Send" fullWidth onClick={onSendHandler} />

        {
          !currentAccount ? (
            <Button colorScheme="gray" text="Connect Wallet" fullWidth onClick={onConnectHandler} />
          ) : null
        }
        
      </Flex>
    </View>
  )
}

export default RecipientForm;