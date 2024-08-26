import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const SettingsPage = () => {
  return (
    <div className='grid gap-6'>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>Full Name</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input
              className='bg-background dark:bg-background'
              placeholder='Your name'
            />
          </form>
        </CardContent>
        <CardFooter className='border-t px-6 py-4'>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input
              className='bg-background dark:bg-background'
              placeholder='Your email address'
              readOnly
            />
          </form>
        </CardContent>
        <CardFooter className='border-t px-6 py-4'>
          <p className='text-sm text-muted-foreground'>
            Email address can&apos;t be modified
          </p>
        </CardFooter>
      </Card>
      <Card x-chunk='dashboard-04-chunk-1'>
        <CardHeader>
          <div className='flex items-center justify-between gap-6'>
            <div>
              <CardTitle className='mb-2'>Profile Image</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </div>
            <div className='size-16 bg-red-100 rounded-full shrink-0' />
          </div>
        </CardHeader>
        <CardFooter className='border-t px-6 py-4'>
          <p className='text-sm text-muted-foreground'>
            The profile image is optional.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;
