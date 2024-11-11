import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Navigate, useSearchParams } from "react-router-dom";
import { useGenericMutation } from "@/hooks/useGenericMutation";
import LoadingMask from "@/components/masks/LoadingMask";
import useGeneralStore from "@/stores/useGeneralStore";
import { useToast } from "@/hooks/use-toast";
import { UserAccessToken } from "@/types/entities/userAccessToken";
import { User } from "@/types/entities/user";

const Authorize = () => {
  const { t } = useTranslation(["common"]);
  const [showPassword, setShowPassword] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("a");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { globalIsLoading, setGlobalIsLoading } = useGeneralStore();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerMutation = useGenericMutation<{
    status: Number;
    message: string;
    data: { user: User; userAccessToken: UserAccessToken };
  }>({
    endpoint: "/auth/register",
    method: "POST",
  });

  const loginMutation = useGenericMutation<{
    status: Number;
    message: string;
    data: { user: User; userAccessToken: UserAccessToken };
  }>({
    endpoint: "/auth/login",
    method: "POST",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setGlobalIsLoading(true);

    if (activeTab === "sign_up") {
      registerMutation.mutate(
        {
          data: { first_name: firstName, last_name: lastName, email, password },
        },
        {
          onSuccess: (res) => {
            setGlobalIsLoading(false);
            if (res.status === 1) {
              window.localStorage.setItem("t",res.data.userAccessToken.access_token)
              window.localStorage.setItem("rt",res.data.userAccessToken.refresh_token)
              toast({
                title: "Registration Success",
                description: "You have successfully registered",
              });
              window.location.reload();
            } else {
              toast({
                title: "Registration Error",
                description: res.message,
                variant: "destructive",
              });
            }
          },
          onError: () => {
            setGlobalIsLoading(false);
            toast({
              title: "Connection Error",
              description:
                "Looks like there's some problem with connection,please try again later",
              variant: "destructive",
            });
          },
        }
      );
    } else {
      loginMutation.mutate(
        { data: { email, password } },
        {
          onSuccess: (res) => {
            setGlobalIsLoading(false);
            if (res.status === 1) {
              window.localStorage.setItem("t",res.data.userAccessToken.access_token)
              window.localStorage.setItem("rt",res.data.userAccessToken.refresh_token)
              toast({
                title: "Login Success",
                description: "You have successfully logged in",
                variant: "default",
              });
              window.location.reload();
            } else {
              toast({
                title: "Login Error",
                description: "Invalid email or password",
                variant: "destructive",
              });
            }
          },
          onError: () => {
            setGlobalIsLoading(false);
            toast({
              title: "Connection Error",
              description:
                "Looks like there's some problem with connection,please try again later",
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  if(window.localStorage.getItem("t")){
    return <Navigate to="/" replace />;
    
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoadingMask
        isLoading={globalIsLoading}
        text="Analyzing patents, please wait..."
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {activeTab === "login" ? t("welcome_back") : t("create_account")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="w-full flex">
            <Button
              className="w-full"
              variant={activeTab === "login" ? "default" : "ghost"}
              rounded="normal"
              onClick={() => setSearchParams({ a: "login" })}
            >
              {t("login")}
            </Button>
            <Button
              className="w-full"
              variant={activeTab === "sign_up" ? "default" : "ghost"}
              rounded="normal"
              onClick={() => setSearchParams({ a: "sign_up" })}
            >
              {t("sign_up")}
            </Button>
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {activeTab === "sign_up" && (
              <>
                <Label htmlFor="name" className="text-sm font-semibold">
                  {t("first_name")}
                </Label>
                <Input
                  id="name"
                  placeholder="John"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <Label htmlFor="name" className="text-sm font-semibold">
                  {t("last_name")}
                </Label>
                <Input
                  id="name"
                  placeholder="Doe"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </>
            )}
            <Label htmlFor="email" className="text-sm font-semibold">
              {t("email")}
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Label htmlFor="password" className="text-sm font-semibold">
              {t("password")}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            <Button className="mt-4 w-full" type="submit">
              {activeTab === "login" ? (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("login")}
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" /> {t("sign_up")}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Authorize;
