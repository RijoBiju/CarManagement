import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

export default function LoginPage() {
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("username: ", username);
    console.log("password: ", password);

    try {
      // loggin in
    } catch (error) {
      console.error(error);
      toast({
        title: "Error logging in",
        description: "Check your credentials and try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-login bg-no-repeat bg-center bg-cover">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Login to dashboard</CardTitle>
            <CardDescription>Access the admin dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>
                  Username:
                  <Input
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-2"
                    placeholder="Your username"
                    autoComplete="username"
                  />
                </Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>
                  Password:
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2"
                    placeholder="Your password"
                    type="password"
                    autoComplete="current-password"
                  />
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline">
              Go to user page
            </Button>
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}
