const { exec } = require('child_process');

// Kill any process using port 9003
exec('netstat -ano | findstr :9003', (error, stdout) => {
  if (stdout) {
    const lines = stdout.split('\n');
    const pids = new Set();
    
    lines.forEach(line => {
      const match = line.match(/\s+(\d+)$/);
      if (match) {
        pids.add(match[1]);
      }
    });
    
    pids.forEach(pid => {
      if (pid !== '0') { // Skip PID 0
        exec(`taskkill /PID ${pid} /F`, (killError) => {
          if (!killError) {
            console.log(`Killed process ${pid} using port 9003`);
          }
        });
      }
    });
  }
  
  // Wait a moment then start the dev server
  setTimeout(() => {
    console.log('Starting development server...');
    exec('npm run dev', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    });
  }, 1000);
});
