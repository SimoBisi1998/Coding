namespace TesterDA
{
    partial class ConfigurationServerForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.serverType = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.labelProtocol = new System.Windows.Forms.Label();
            this.labelAddress = new System.Windows.Forms.Label();
            this.serverProcess = new System.Windows.Forms.TextBox();
            this.labelEndpoint = new System.Windows.Forms.Label();
            this.labelProcess = new System.Windows.Forms.Label();
            this.serverProtocol = new System.Windows.Forms.TextBox();
            this.serverAddress = new System.Windows.Forms.TextBox();
            this.serverEndpoint = new System.Windows.Forms.TextBox();
            this.connectButton = new System.Windows.Forms.Button();
            this.groupBoxDbConfig = new System.Windows.Forms.GroupBox();
            this.loadingLabel = new System.Windows.Forms.Label();
            this.progressBar = new System.Windows.Forms.ProgressBar();
            this.serverPath = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.serverProvider = new System.Windows.Forms.TextBox();
            this.labelDbProvider = new System.Windows.Forms.Label();
            this.exceptionLabel = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBoxDbConfig.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.BackColor = System.Drawing.SystemColors.Control;
            this.groupBox1.Controls.Add(this.serverType);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.labelProtocol);
            this.groupBox1.Controls.Add(this.labelAddress);
            this.groupBox1.Controls.Add(this.serverProcess);
            this.groupBox1.Controls.Add(this.labelEndpoint);
            this.groupBox1.Controls.Add(this.labelProcess);
            this.groupBox1.Controls.Add(this.serverProtocol);
            this.groupBox1.Controls.Add(this.serverAddress);
            this.groupBox1.Controls.Add(this.serverEndpoint);
            this.groupBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(12, 12);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(485, 440);
            this.groupBox1.TabIndex = 9;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Server parameters";
            // 
            // serverType
            // 
            this.serverType.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.serverType.Location = new System.Drawing.Point(158, 377);
            this.serverType.Name = "serverType";
            this.serverType.Size = new System.Drawing.Size(298, 26);
            this.serverType.TabIndex = 9;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(23, 380);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(104, 20);
            this.label1.TabIndex = 8;
            this.label1.Text = "Server Type";
            this.label1.UseMnemonic = false;
            // 
            // labelProtocol
            // 
            this.labelProtocol.AutoSize = true;
            this.labelProtocol.Location = new System.Drawing.Point(46, 52);
            this.labelProtocol.Name = "labelProtocol";
            this.labelProtocol.Size = new System.Drawing.Size(75, 20);
            this.labelProtocol.TabIndex = 0;
            this.labelProtocol.Text = "Protocol";
            // 
            // labelAddress
            // 
            this.labelAddress.AutoSize = true;
            this.labelAddress.Location = new System.Drawing.Point(46, 135);
            this.labelAddress.Name = "labelAddress";
            this.labelAddress.Size = new System.Drawing.Size(75, 20);
            this.labelAddress.TabIndex = 1;
            this.labelAddress.Text = "Address";
            // 
            // serverProcess
            // 
            this.serverProcess.Enabled = false;
            this.serverProcess.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.serverProcess.Location = new System.Drawing.Point(156, 297);
            this.serverProcess.Name = "serverProcess";
            this.serverProcess.Size = new System.Drawing.Size(298, 26);
            this.serverProcess.TabIndex = 7;
            // 
            // labelEndpoint
            // 
            this.labelEndpoint.AutoSize = true;
            this.labelEndpoint.Location = new System.Drawing.Point(46, 215);
            this.labelEndpoint.Name = "labelEndpoint";
            this.labelEndpoint.Size = new System.Drawing.Size(81, 20);
            this.labelEndpoint.TabIndex = 2;
            this.labelEndpoint.Text = "Endpoint";
            this.labelEndpoint.UseMnemonic = false;
            // 
            // labelProcess
            // 
            this.labelProcess.AutoSize = true;
            this.labelProcess.Location = new System.Drawing.Point(46, 304);
            this.labelProcess.Name = "labelProcess";
            this.labelProcess.Size = new System.Drawing.Size(73, 20);
            this.labelProcess.TabIndex = 6;
            this.labelProcess.Text = "Process";
            this.labelProcess.UseMnemonic = false;
            // 
            // serverProtocol
            // 
            this.serverProtocol.Enabled = false;
            this.serverProtocol.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.serverProtocol.Location = new System.Drawing.Point(156, 49);
            this.serverProtocol.Name = "serverProtocol";
            this.serverProtocol.Size = new System.Drawing.Size(298, 26);
            this.serverProtocol.TabIndex = 3;
            // 
            // serverAddress
            // 
            this.serverAddress.Enabled = false;
            this.serverAddress.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.serverAddress.Location = new System.Drawing.Point(156, 135);
            this.serverAddress.Name = "serverAddress";
            this.serverAddress.Size = new System.Drawing.Size(298, 26);
            this.serverAddress.TabIndex = 5;
            // 
            // serverEndpoint
            // 
            this.serverEndpoint.Enabled = false;
            this.serverEndpoint.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.serverEndpoint.Location = new System.Drawing.Point(156, 215);
            this.serverEndpoint.Name = "serverEndpoint";
            this.serverEndpoint.Size = new System.Drawing.Size(298, 26);
            this.serverEndpoint.TabIndex = 4;
            // 
            // connectButton
            // 
            this.connectButton.Location = new System.Drawing.Point(220, 160);
            this.connectButton.Name = "connectButton";
            this.connectButton.Size = new System.Drawing.Size(169, 51);
            this.connectButton.TabIndex = 10;
            this.connectButton.Text = "Connect";
            this.connectButton.UseVisualStyleBackColor = true;
            this.connectButton.Click += new System.EventHandler(this.connectButton_Click_1Async);
            // 
            // groupBoxDbConfig
            // 
            this.groupBoxDbConfig.Controls.Add(this.loadingLabel);
            this.groupBoxDbConfig.Controls.Add(this.progressBar);
            this.groupBoxDbConfig.Controls.Add(this.serverPath);
            this.groupBoxDbConfig.Controls.Add(this.label2);
            this.groupBoxDbConfig.Controls.Add(this.connectButton);
            this.groupBoxDbConfig.Controls.Add(this.serverProvider);
            this.groupBoxDbConfig.Controls.Add(this.labelDbProvider);
            this.groupBoxDbConfig.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBoxDbConfig.Location = new System.Drawing.Point(527, 20);
            this.groupBoxDbConfig.Name = "groupBoxDbConfig";
            this.groupBoxDbConfig.Size = new System.Drawing.Size(613, 329);
            this.groupBoxDbConfig.TabIndex = 13;
            this.groupBoxDbConfig.TabStop = false;
            this.groupBoxDbConfig.Text = "Database configuration";
            // 
            // loadingLabel
            // 
            this.loadingLabel.AutoSize = true;
            this.loadingLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.loadingLabel.Location = new System.Drawing.Point(216, 296);
            this.loadingLabel.Name = "loadingLabel";
            this.loadingLabel.Size = new System.Drawing.Size(0, 20);
            this.loadingLabel.TabIndex = 15;
            // 
            // progressBar
            // 
            this.progressBar.Location = new System.Drawing.Point(75, 235);
            this.progressBar.Name = "progressBar";
            this.progressBar.Size = new System.Drawing.Size(460, 23);
            this.progressBar.TabIndex = 14;
            // 
            // serverPath
            // 
            this.serverPath.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.serverPath.Location = new System.Drawing.Point(100, 77);
            this.serverPath.Name = "serverPath";
            this.serverPath.Size = new System.Drawing.Size(471, 26);
            this.serverPath.TabIndex = 7;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(20, 80);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(46, 20);
            this.label2.TabIndex = 6;
            this.label2.Text = "Path";
            // 
            // serverProvider
            // 
            this.serverProvider.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.serverProvider.Location = new System.Drawing.Point(100, 37);
            this.serverProvider.Name = "serverProvider";
            this.serverProvider.Size = new System.Drawing.Size(471, 26);
            this.serverProvider.TabIndex = 5;
            // 
            // labelDbProvider
            // 
            this.labelDbProvider.AutoSize = true;
            this.labelDbProvider.Location = new System.Drawing.Point(20, 40);
            this.labelDbProvider.Name = "labelDbProvider";
            this.labelDbProvider.Size = new System.Drawing.Size(74, 20);
            this.labelDbProvider.TabIndex = 4;
            this.labelDbProvider.Text = "Provider";
            // 
            // exceptionLabel
            // 
            this.exceptionLabel.AutoSize = true;
            this.exceptionLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.exceptionLabel.Location = new System.Drawing.Point(707, 362);
            this.exceptionLabel.Name = "exceptionLabel";
            this.exceptionLabel.Size = new System.Drawing.Size(0, 20);
            this.exceptionLabel.TabIndex = 14;
            // 
            // ConfigurationServerForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1152, 488);
            this.Controls.Add(this.exceptionLabel);
            this.Controls.Add(this.groupBoxDbConfig);
            this.Controls.Add(this.groupBox1);
            this.Name = "ConfigurationServerForm";
            this.Text = "DATester";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBoxDbConfig.ResumeLayout(false);
            this.groupBoxDbConfig.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label labelProtocol;
        private System.Windows.Forms.Label labelAddress;
        private System.Windows.Forms.TextBox serverProcess;
        private System.Windows.Forms.Label labelEndpoint;
        private System.Windows.Forms.Label labelProcess;
        private System.Windows.Forms.TextBox serverProtocol;
        private System.Windows.Forms.TextBox serverAddress;
        private System.Windows.Forms.TextBox serverEndpoint;
        private System.Windows.Forms.Button connectButton;
        private System.Windows.Forms.GroupBox groupBoxDbConfig;
        private System.Windows.Forms.TextBox serverPath;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox serverProvider;
        private System.Windows.Forms.Label labelDbProvider;
        private System.Windows.Forms.ProgressBar progressBar;
        private System.Windows.Forms.Label loadingLabel;
        private System.Windows.Forms.Label exceptionLabel;
        private System.Windows.Forms.TextBox serverType;
        private System.Windows.Forms.Label label1;
    }
}

