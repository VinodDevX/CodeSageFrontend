// app/redux/provider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import AuthInitializer from "@/features/auth/components/AuthInitializer";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}
