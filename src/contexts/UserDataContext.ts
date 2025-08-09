import { createContext } from "react";
import { type UserData, initialUserData } from "../types";

interface UserDataContextValues {
  userData: UserData;
  handleFilterUpdate(filter: Partial<UserData>): void;
  clearFilters?(): void;
}

const UserDataContext = createContext<UserDataContextValues>({
  userData: initialUserData,
  handleFilterUpdate: () => {},
  clearFilters: () => {},
});

export default UserDataContext;
