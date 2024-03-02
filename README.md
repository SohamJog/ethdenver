# CrypTap

Check out our live demo here: [https://ethdenver-smoky.vercel.app/](url)

Unlock the power of NFC to instantly share crypto, NFTs, and more with just a tap. We let the user send crypto using links. These links can be shared, or specifically air-dropped using Apple's new NFC feature(nfc because you can have airdrop off and still receive crypto payments from a friend or someone you trust). 

## Built using:
### Linea: We used Linea's Goerli TestNet for fast transaction speed and low gas fees. Our smart contracts can be found in the `contracts` folder. You may find our contract address here: [https://goerli.lineascan.build/address/0x1D5EfDba4f8acFd6d9098b356879639526aD5e99
](url)
### Metamask SDK: We used Metamask's SDK to seamlessly integrate Metamask functionalities on web and mobile. It was super useful when it came to mobile payments.
### Harpie: We used Harpie to know if the sender's address is involved in hacks or has been compromised previously. The transaction only goes through if the sender has a clean record


