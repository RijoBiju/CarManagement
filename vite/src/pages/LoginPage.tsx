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

import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-login bg-no-repeat bg-center bg-cover">
      <Card className="w-[350px]">
        <form>
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
            <Link to="/dashboard">
              <Button type="submit">Login</Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
