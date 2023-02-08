import React, { useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "meecha/store/store";
import {
  SingleInputPage,
  SingleInputPageProps,
} from "meecha/components/pages/SingleInputPage";
import { CustomTextInput } from "meecha/components/input/CustomTextInput";
import {
  UpdateMeApiArg,
  useAuthRefreshMutation,
  useCreateUserMutation,
  useUpdateMeMutation,
} from "meecha/generated/api.generated";
import { login, signup } from "meecha/store/auth";
import { GenderSelector } from "meecha/components/input/GenderSelector";
import { DateInput } from "meecha/components/input/DateInput";
import moment from "moment";
import { Text } from "react-native";

const SignUpScreen: FC = () => {
  const [handle, setHandle] = useState<string>();
  const [gender, setGender] = useState<string>();
  // Birthday-related
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<string>();
  const [birthday, setBirthday] = useState<Date>();

  const { authPackage } = useSelector((state: RootState) => state.auth);
  const user = authPackage?.user;

  const [error, setError] = useState<string>();
  const [pos, setPos] = useState<number>(user ? 1 : 0);

  const [createUser] = useCreateUserMutation();
  const [switchUser] = useAuthRefreshMutation();
  const [updateMe] = useUpdateMeMutation();

  const dispatch = useDispatch();

  async function invokeUpdateMe(gender?: string, birthday?: Date) {
    const args: UpdateMeApiArg = { body: {} };
    if (gender === "M" || gender === "F") {
      // TODO: Other
      args.body.gender = gender;
    }
    if (birthday) {
      const zeroPad = (num: number) => String(num).padStart(2, "0");
      const yearB = birthday.getUTCFullYear();
      const monthB = birthday.getUTCMonth() + 1;
      const dayB = birthday.getUTCDate();
      args.body.birthday = `${yearB}-${zeroPad(monthB)}-${zeroPad(dayB)}`;
    }
    try {
      await updateMe(args); // TODO: Only do this when there is an update
      setPos(pos + 1);
      // Finishing signup
      dispatch(login(authPackage!));
      setError(undefined);
    } catch (e) {
      console.log("unexpected error", e);
      setError("Server error - please try again later");
    }
  }

  const items: Array<SingleInputPageProps> = [
    {
      title: "Create a user handle",
      inputComp: (
        <CustomTextInput
          value={handle}
          onChangeText={setHandle}
          maxLength={20}
          showLength={true}
          error={error}
        />
      ),
      disabled: !handle,
      onSubmit: async (ev) => {
        if (!handle) {
          setError("Handle is missing");
          return;
        }
        if (handle.length < 3 || handle.length > 20) {
          setError("Handle length must be between 3 to 20");
          return;
        }
        console.log("collected handle", handle);
        try {
          // Create user with the handle
          const { id } = await createUser({
            body: { handle: handle },
          }).unwrap();
          console.log("created user", id);
          // Re-login via refresh endpoint
          const refreshToken = authPackage?.tokens.refreshToken;
          const newAuthPkg = await switchUser({
            body: {
              userId: id,
              refreshToken: refreshToken!,
            },
          }).unwrap();
          console.log("switched user", newAuthPkg);
          dispatch(signup(newAuthPkg));
          setPos(pos + 1);
          setError(undefined);
        } catch (e) {
          console.log(e);
          // TODO: On 409 conflict, set error
          if (e.status === 409) {
            setError("User handle has been registered");
          }
        }
      },
      note: "User handle must be unique.",
    },
    {
      title: "Select your gender",
      inputComp: <GenderSelector value={gender} setValue={setGender} />,
      note: "Gender cannot be changed once set.",
      skip: !gender,
      onSubmit: (ev) => {
        console.log("collected gender", gender);
        setPos(pos + 1);
      },
    },
    {
      title: "Enter your birthday",
      inputComp: (
        <DateInput
          day={day}
          setDay={setDay}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          error={error}
        />
      ),
      note: "Other users can only see your age.",
      skip: !(day && month && year),
      onSubmit: async (ev) => {
        let date: Date | undefined;
        if (!day !== !month || !month !== !year) {
          setError("Incomplete date");
          return;
        }
        // Convert to a date object
        if (day && month && year) {
          // if (!Number.isInteger(day) || !Number.isInteger(month) ||
          //   !Number.isInteger(year)) {
          //   setError('Invalid date')
          //   return
          // }
          // Validate the date
          const momentDate = moment(`${month}-${day}-${year}`, "MM-DD-YYYY");
          if (!momentDate.isValid()) {
            setError("Invalid date");
            return;
          }
          // Must be 18 years old
          if (moment().diff(momentDate, "year") < 18) {
            setError("Must be 18 or older");
            return;
          }
          date = momentDate.toDate();
          setBirthday(date);
          console.log("collected date", momentDate);
        }
        // Submit update
        await invokeUpdateMe(gender, date);
      },
      // TODO: Select your country
    },
  ];

  if (pos >= items.length) {
    return <Text>Finished signup</Text>;
  }

  const item = items[pos];
  return <SingleInputPage {...item} />;
};

export default SignUpScreen;
