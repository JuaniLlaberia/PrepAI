import DeleteAccModal from './(components)/DeleteAccModal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const AdvancedSettingsPage = () => {
  return (
    <div className='grid gap-6'>
      <Card
        x-chunk='dashboard-04-chunk-1'
        className='border-red-300 dark:border-red-500'
      >
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently remove your PrepAI account and all it&apos;s conent,
            including paths, interviews and exams. This action is not
            reversible, so please continue with caution.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className='border-t px-6 py-4 border-t-red-300 dark:border-t-red-500 bg-red-200 dark:bg-red-600/15'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='destructive'>Delete my account</Button>
            </DialogTrigger>
            <DialogContent>
              <DeleteAccModal />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdvancedSettingsPage;
