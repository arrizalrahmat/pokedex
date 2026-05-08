export type Member = {
  name: {
    first: string;
    last: string;
    title: string;
  };
};

export type GetMembersResponse = {
  results: Member[];
};

export type MembersStateType = {
  members: Member[];
  isLoading: boolean;
  error: string | null;
};
