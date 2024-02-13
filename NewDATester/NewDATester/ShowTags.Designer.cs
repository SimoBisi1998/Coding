namespace TesterDA
{
    partial class ShowTags
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
            this.readButton = new System.Windows.Forms.Button();
            this.writeButton = new System.Windows.Forms.Button();
            this.valueFromRead = new System.Windows.Forms.TextBox();
            this.textBoxWriteValue = new System.Windows.Forms.TextBox();
            this.treeView = new System.Windows.Forms.TreeView();
            this.backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            this.labelDataType = new System.Windows.Forms.Label();
            this.textBoxDataType = new System.Windows.Forms.TextBox();
            this.tabControl = new System.Windows.Forms.TabControl();
            this.OPX = new System.Windows.Forms.TabPage();
            this.ACK = new System.Windows.Forms.TabPage();
            this.tablePanel = new System.Windows.Forms.TableLayoutPanel();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.textlength = new System.Windows.Forms.Label();
            this.textBoxLength = new System.Windows.Forms.TextBox();
            this.bitBox = new System.Windows.Forms.Label();
            this.bitTextBox = new System.Windows.Forms.TextBox();
            this.listOfDataType = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.textBoxPlcID = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.addressBox = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.hexText = new System.Windows.Forms.TextBox();
            this.binaryText = new System.Windows.Forms.TextBox();
            this.decimalText = new System.Windows.Forms.Label();
            this.arrayText = new System.Windows.Forms.Label();
            this.hexadecimalText = new System.Windows.Forms.Label();
            this.tabControl.SuspendLayout();
            this.OPX.SuspendLayout();
            this.ACK.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.SuspendLayout();
            // 
            // readButton
            // 
            this.readButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.readButton.Location = new System.Drawing.Point(636, 583);
            this.readButton.Name = "readButton";
            this.readButton.Size = new System.Drawing.Size(100, 42);
            this.readButton.TabIndex = 1;
            this.readButton.Text = "Read";
            this.readButton.UseVisualStyleBackColor = true;
            this.readButton.Click += new System.EventHandler(this.readButton_Click);
            // 
            // writeButton
            // 
            this.writeButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.writeButton.Location = new System.Drawing.Point(636, 633);
            this.writeButton.Name = "writeButton";
            this.writeButton.Size = new System.Drawing.Size(100, 42);
            this.writeButton.TabIndex = 2;
            this.writeButton.Text = "Write";
            this.writeButton.UseVisualStyleBackColor = true;
            this.writeButton.Click += new System.EventHandler(this.writeButton_Click);
            // 
            // valueFromRead
            // 
            this.valueFromRead.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.valueFromRead.Location = new System.Drawing.Point(47, 585);
            this.valueFromRead.MinimumSize = new System.Drawing.Size(4, 40);
            this.valueFromRead.Name = "valueFromRead";
            this.valueFromRead.Size = new System.Drawing.Size(170, 40);
            this.valueFromRead.TabIndex = 6;
            this.valueFromRead.Visible = false;
            // 
            // textBoxWriteValue
            // 
            this.textBoxWriteValue.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBoxWriteValue.Location = new System.Drawing.Point(33, 640);
            this.textBoxWriteValue.Name = "textBoxWriteValue";
            this.textBoxWriteValue.Size = new System.Drawing.Size(579, 22);
            this.textBoxWriteValue.TabIndex = 7;
            // 
            // treeView
            // 
            this.treeView.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.treeView.Location = new System.Drawing.Point(6, 6);
            this.treeView.Name = "treeView";
            this.treeView.Size = new System.Drawing.Size(768, 483);
            this.treeView.TabIndex = 8;
            // 
            // labelDataType
            // 
            this.labelDataType.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.labelDataType.AutoSize = true;
            this.labelDataType.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelDataType.Location = new System.Drawing.Point(29, 531);
            this.labelDataType.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.labelDataType.Name = "labelDataType";
            this.labelDataType.Size = new System.Drawing.Size(79, 16);
            this.labelDataType.TabIndex = 63;
            this.labelDataType.Text = "Data type:";
            // 
            // textBoxDataType
            // 
            this.textBoxDataType.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBoxDataType.BackColor = System.Drawing.SystemColors.Control;
            this.textBoxDataType.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBoxDataType.Location = new System.Drawing.Point(110, 528);
            this.textBoxDataType.Margin = new System.Windows.Forms.Padding(4);
            this.textBoxDataType.Multiline = true;
            this.textBoxDataType.Name = "textBoxDataType";
            this.textBoxDataType.ReadOnly = true;
            this.textBoxDataType.Size = new System.Drawing.Size(604, 24);
            this.textBoxDataType.TabIndex = 62;
            // 
            // tabControl
            // 
            this.tabControl.Controls.Add(this.OPX);
            this.tabControl.Controls.Add(this.ACK);
            this.tabControl.Controls.Add(this.tabPage1);
            this.tabControl.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.tabControl.Location = new System.Drawing.Point(12, 0);
            this.tabControl.Name = "tabControl";
            this.tabControl.SelectedIndex = 0;
            this.tabControl.Size = new System.Drawing.Size(785, 521);
            this.tabControl.TabIndex = 64;
            // 
            // OPX
            // 
            this.OPX.Controls.Add(this.treeView);
            this.OPX.Location = new System.Drawing.Point(4, 25);
            this.OPX.Name = "OPX";
            this.OPX.Padding = new System.Windows.Forms.Padding(3);
            this.OPX.Size = new System.Drawing.Size(777, 492);
            this.OPX.TabIndex = 0;
            this.OPX.Text = "OPX";
            this.OPX.UseVisualStyleBackColor = true;
            // 
            // ACK
            // 
            this.ACK.Controls.Add(this.tablePanel);
            this.ACK.Location = new System.Drawing.Point(4, 25);
            this.ACK.Name = "ACK";
            this.ACK.Padding = new System.Windows.Forms.Padding(3);
            this.ACK.Size = new System.Drawing.Size(777, 492);
            this.ACK.TabIndex = 1;
            this.ACK.Text = "ACK";
            this.ACK.UseVisualStyleBackColor = true;
            // 
            // tablePanel
            // 
            this.tablePanel.ColumnCount = 2;
            this.tablePanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tablePanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tablePanel.Location = new System.Drawing.Point(6, 6);
            this.tablePanel.Name = "tablePanel";
            this.tablePanel.RowCount = 2;
            this.tablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tablePanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tablePanel.Size = new System.Drawing.Size(765, 483);
            this.tablePanel.TabIndex = 0;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.textlength);
            this.tabPage1.Controls.Add(this.textBoxLength);
            this.tabPage1.Controls.Add(this.bitBox);
            this.tabPage1.Controls.Add(this.bitTextBox);
            this.tabPage1.Controls.Add(this.listOfDataType);
            this.tabPage1.Controls.Add(this.label3);
            this.tabPage1.Controls.Add(this.textBoxPlcID);
            this.tabPage1.Controls.Add(this.label1);
            this.tabPage1.Controls.Add(this.addressBox);
            this.tabPage1.Controls.Add(this.label2);
            this.tabPage1.Location = new System.Drawing.Point(4, 25);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(777, 492);
            this.tabPage1.TabIndex = 2;
            this.tabPage1.Text = "S7Direct Read/Write";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // textlength
            // 
            this.textlength.AutoSize = true;
            this.textlength.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textlength.Location = new System.Drawing.Point(296, 342);
            this.textlength.Name = "textlength";
            this.textlength.Size = new System.Drawing.Size(54, 16);
            this.textlength.TabIndex = 84;
            this.textlength.Text = "Length";
            // 
            // textBoxLength
            // 
            this.textBoxLength.Enabled = false;
            this.textBoxLength.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBoxLength.Location = new System.Drawing.Point(384, 339);
            this.textBoxLength.Name = "textBoxLength";
            this.textBoxLength.Size = new System.Drawing.Size(103, 22);
            this.textBoxLength.TabIndex = 83;
            // 
            // bitBox
            // 
            this.bitBox.AutoSize = true;
            this.bitBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.bitBox.Location = new System.Drawing.Point(304, 382);
            this.bitBox.Name = "bitBox";
            this.bitBox.Size = new System.Drawing.Size(32, 16);
            this.bitBox.TabIndex = 80;
            this.bitBox.Text = "BIT";
            // 
            // bitTextBox
            // 
            this.bitTextBox.Enabled = false;
            this.bitTextBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.bitTextBox.Location = new System.Drawing.Point(384, 379);
            this.bitTextBox.Name = "bitTextBox";
            this.bitTextBox.Size = new System.Drawing.Size(103, 22);
            this.bitTextBox.TabIndex = 79;
            // 
            // listOfDataType
            // 
            this.listOfDataType.FormattingEnabled = true;
            this.listOfDataType.Items.AddRange(new object[] {
            "Int16",
            "Int32",
            "Bool",
            "Float",
            "Word",
            "Dword",
            "String",
            "Char",
            "Byte"});
            this.listOfDataType.Location = new System.Drawing.Point(385, 296);
            this.listOfDataType.Name = "listOfDataType";
            this.listOfDataType.Size = new System.Drawing.Size(102, 24);
            this.listOfDataType.TabIndex = 78;
            // 
            // label3
            // 
            this.label3.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(284, 298);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(75, 16);
            this.label3.TabIndex = 76;
            this.label3.Text = "Data type";
            // 
            // textBoxPlcID
            // 
            this.textBoxPlcID.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper;
            this.textBoxPlcID.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBoxPlcID.Location = new System.Drawing.Point(384, 258);
            this.textBoxPlcID.Name = "textBoxPlcID";
            this.textBoxPlcID.Size = new System.Drawing.Size(103, 22);
            this.textBoxPlcID.TabIndex = 75;
            // 
            // label1
            // 
            this.label1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(295, 261);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(55, 16);
            this.label1.TabIndex = 74;
            this.label1.Text = "PLC ID";
            // 
            // addressBox
            // 
            this.addressBox.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper;
            this.addressBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.addressBox.Location = new System.Drawing.Point(109, 199);
            this.addressBox.Name = "addressBox";
            this.addressBox.Size = new System.Drawing.Size(579, 22);
            this.addressBox.TabIndex = 73;
            // 
            // label2
            // 
            this.label2.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(26, 202);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(66, 16);
            this.label2.TabIndex = 72;
            this.label2.Text = "Address";
            // 
            // hexText
            // 
            this.hexText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.hexText.Location = new System.Drawing.Point(431, 585);
            this.hexText.MinimumSize = new System.Drawing.Size(4, 40);
            this.hexText.Name = "hexText";
            this.hexText.Size = new System.Drawing.Size(170, 40);
            this.hexText.TabIndex = 65;
            this.hexText.Visible = false;
            // 
            // binaryText
            // 
            this.binaryText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.binaryText.Location = new System.Drawing.Point(245, 585);
            this.binaryText.MinimumSize = new System.Drawing.Size(4, 40);
            this.binaryText.Name = "binaryText";
            this.binaryText.Size = new System.Drawing.Size(170, 40);
            this.binaryText.TabIndex = 66;
            this.binaryText.Visible = false;
            // 
            // decimalText
            // 
            this.decimalText.AutoSize = true;
            this.decimalText.Location = new System.Drawing.Point(116, 566);
            this.decimalText.Name = "decimalText";
            this.decimalText.Size = new System.Drawing.Size(45, 13);
            this.decimalText.TabIndex = 67;
            this.decimalText.Text = "Decimal";
            this.decimalText.Visible = false;
            // 
            // arrayText
            // 
            this.arrayText.AutoSize = true;
            this.arrayText.Location = new System.Drawing.Point(286, 566);
            this.arrayText.Name = "arrayText";
            this.arrayText.Size = new System.Drawing.Size(66, 13);
            this.arrayText.TabIndex = 68;
            this.arrayText.Text = "Array of byte";
            this.arrayText.Visible = false;
            // 
            // hexadecimalText
            // 
            this.hexadecimalText.AutoSize = true;
            this.hexadecimalText.Location = new System.Drawing.Point(485, 566);
            this.hexadecimalText.Name = "hexadecimalText";
            this.hexadecimalText.Size = new System.Drawing.Size(68, 13);
            this.hexadecimalText.TabIndex = 69;
            this.hexadecimalText.Text = "Hexadecimal";
            this.hexadecimalText.Visible = false;
            // 
            // ShowTags
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 687);
            this.Controls.Add(this.hexadecimalText);
            this.Controls.Add(this.arrayText);
            this.Controls.Add(this.decimalText);
            this.Controls.Add(this.binaryText);
            this.Controls.Add(this.hexText);
            this.Controls.Add(this.tabControl);
            this.Controls.Add(this.labelDataType);
            this.Controls.Add(this.textBoxDataType);
            this.Controls.Add(this.textBoxWriteValue);
            this.Controls.Add(this.valueFromRead);
            this.Controls.Add(this.writeButton);
            this.Controls.Add(this.readButton);
            this.Name = "ShowTags";
            this.Text = "ShowTags";
            this.tabControl.ResumeLayout(false);
            this.OPX.ResumeLayout(false);
            this.ACK.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Button readButton;
        private System.Windows.Forms.Button writeButton;
        private System.Windows.Forms.TextBox valueFromRead;
        private System.Windows.Forms.TextBox textBoxWriteValue;
        private System.Windows.Forms.TreeView treeView;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
        private System.Windows.Forms.Label labelDataType;
        private System.Windows.Forms.TextBox textBoxDataType;
        private System.Windows.Forms.TabControl tabControl;
        private System.Windows.Forms.TabPage OPX;
        private System.Windows.Forms.TabPage ACK;
        private System.Windows.Forms.TableLayoutPanel tablePanel;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox addressBox;
        private System.Windows.Forms.TextBox textBoxPlcID;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox listOfDataType;
        private System.Windows.Forms.Label bitBox;
        private System.Windows.Forms.TextBox bitTextBox;
        private System.Windows.Forms.Label textlength;
        private System.Windows.Forms.TextBox textBoxLength;
        private System.Windows.Forms.TextBox hexText;
        private System.Windows.Forms.TextBox binaryText;
        private System.Windows.Forms.Label decimalText;
        private System.Windows.Forms.Label arrayText;
        private System.Windows.Forms.Label hexadecimalText;
    }
}