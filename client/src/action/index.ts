export const LOG_IN = "LOG_IN";
export const DROP_OUT = "DROP_OUT";
export const LOG_OUT = "LOG_OUT";

export const logIn = (
  accessToken: string,
  id: string,
  userId: string,
  email: string,
  profile: string
) => {
  return {
    type: LOG_IN,
    payload: {
      accessToken,
      id,
      userId,
      email,
      profile,
    },
  };
};
// // ------------------------------------
export const CREATE_TODO = "CREATE_TODO";
export const createToDo = (id: any, content: any) => {
  return {
    type: createToDo,
    payload: {
      id,
      content,
    },
  };
};

// export const DELETE_TODO = "DELETE_TODO";
// export const deletetoDo = (idcontent: string, type: string) => {
//   return {
//     type: deletetoDo,
//     payload: {},
//   };
// };

// export const DRAG_TODO = "DRAG_TODO";
// export const dragToDo = (id: string, content: string, type: string) => {
//   return {
//     type: dragToDo,
//     payload: {
//       id,
//       content,
//       type,
//     },
//   };
// };

// /*

// 드래그 앤 드롭은 자유롭게 움직이지 않습니까....
// 그러면 내가 바꿔줄 수 있는것은

// state를 불러와서,
//   const onDragEnd = ({ destination, source }: DropResult) => {
//     const target = toDos.splice(source.index, 1);
//     console.log(target);
//     console.log
//     setToDos(...toDos, targetdestination.in;
//     기존의 배열을 불러와서 새로운 객체를 만들어주고

// */
export const dropout = (accessToken: string) => {
  return {
    type: DROP_OUT,
    payload: {
      accessToken,
    },
  };
};

export const logout = (accessToken: string) => {
  return {
    type: LOG_OUT,
    payload: {
      accessToken,
    },
  };
};
