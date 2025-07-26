import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../services/profileService";
import { Alert } from "react-native";

const useEditProfile = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false); // <-- добавили

  useEffect(() => {
    getUserProfile()
      .then(data => {
        setForm({
          firstName: data.data.firstName || "",
          lastName: data.data.lastName || "",
          phone: data.data.phone || "",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const onChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const onSave = async () => {
    try {
      setLoading(true);
      await updateProfile(form);
      Alert.alert("Успех", "Профиль обновлён");
      setSuccess(true); // <-- обновили
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось сохранить изменения");
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, onChange, onSave, success }; // <-- вернули success
};

export default useEditProfile;
