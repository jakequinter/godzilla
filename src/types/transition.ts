export type Transition = {
  transitions: TransitionValue[];
};

type TransitionValue = {
  id: string;
  name: string;
  to: {
    id: string;
  };
};
