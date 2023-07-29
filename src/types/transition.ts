export type Transition = {
  transitions: TransitionValue[];
};

export type TransitionValue = {
  id: string;
  name: string;
  to: {
    id: string;
  };
};
