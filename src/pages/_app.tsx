import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useContext, createContext, useState, ReactNode, SetStateAction, Dispatch } from "react";

type usernameContextType = {
	username: string;
	setUsername: Dispatch<SetStateAction<string>>;
};

const usernameDefaultValue: usernameContextType = {
  username: '',
  setUsername: () => {}
}

export const UsernameContext = createContext<usernameContextType>(usernameDefaultValue);

export function useUsername() {
  return useContext(UsernameContext);
}

export default function App({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string>("");

	return (
		<UsernameContext.Provider value={{username, setUsername}}>
			<Component {...pageProps} />
		</UsernameContext.Provider>
	);
}
