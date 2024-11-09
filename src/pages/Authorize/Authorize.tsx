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
import { useSearchParams } from "react-router-dom";

const Authorize = () => {
  const { t } = useTranslation(["common"]);
  const [showPassword, setShowPassword] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("a");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
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
          <form className="flex flex-col gap-2">
            {activeTab === "sign_up" && (
              <>
                <Label htmlFor="name" className="text-sm font-semibold">
                  {t("full_name")}
                </Label>
                <Input id="name" placeholder="John Doe" required />
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
            />
            <Label htmlFor="password" className="text-sm font-semibold">
              {t("password")}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
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
