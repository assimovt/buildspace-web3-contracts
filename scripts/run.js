const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  })
  await waveContract.deployed()
  console.log('Contract addy:', waveContract.address)

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  )
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  )

  let waveCount
  waveCount = await waveContract.getTotalWaves()
  console.log(waveCount.toNumber())

  /*
   * Let's try two waves now
   */
  let waveTxn = await waveContract.wave('This is wave #1')
  await waveTxn.wait()

  waveTxn = await waveContract.wave('This is wave #2')
  await waveTxn.wait()

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  )

  // const [_, randomPerson] = await ethers.getSigners()
  // waveTxn = await waveContract.connect(randomPerson).wave('Another message!')
  // await waveTxn.wait()

  const allWaves = await waveContract.getAllWaves()
  console.log(allWaves)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
